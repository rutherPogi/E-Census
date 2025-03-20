// models/surveyModel.js - Survey-related database operations
import pool from '../config/database.js';

export const generateSurveyId = async (connection) => {
  // Get current date components
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Last 2 digits of year
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month (01-12)
  const datePrefix = `${year}${month}`;
  
  try {
    // Get the current sequence for today
    const [rows] = await connection.query(
      `SELECT MAX(surveyID) as maxId FROM SurveyResponses 
       WHERE surveyID LIKE ?`,
      [`${datePrefix}%`]
    );
    
    let sequence = 1;
    if (rows[0].maxId) {
      // Extract the sequence number from the existing ID
      const currentSequence = parseInt(rows[0].maxId.toString().slice(6));
      sequence = currentSequence + 1;
    }
    
    // Format as YYMMDDXXXX where XXXX is the sequence number
    const sequenceStr = sequence.toString().padStart(4, '0');
    const surveyId = `${datePrefix}${sequenceStr}`;
    
    // Verify this ID doesn't already exist (double-check)
    const [existingCheck] = await connection.query(
      `SELECT COUNT(*) as count FROM SurveyResponses WHERE surveyID = ?`,
      [surveyId]
    );
    
    if (existingCheck[0].count > 0) {
      // In the unlikely event of a collision, recursively try again
      return generateSurveyId(connection);
    }
    return surveyId;
  } catch (error) {
    console.error('Error generating survey ID:', error);
    throw error;
  }
};

export const createSurvey = async (surveyData, connection) => {

  const [result] = await connection.query(
    `INSERT INTO SurveyResponses 
     (surveyID, respondent, interviewer, surveyDate, barangay, municipality, 
      monthlyIncome, irregularIncome, familyIncome)
     VALUES (?, ?, ?, CURDATE(), ?, ?, ?, ?, ?)`,
    [
      surveyData.surveyID,
      surveyData.respondent,
      surveyData.interviewer,
      surveyData.barangay,
      surveyData.municipality,
      parseFloat(surveyData.totalMonthlyIncome) || 0,
      parseFloat(surveyData.irregularIncome) || 0,
      parseFloat(surveyData.familyIncome) || 0
    ]
  );
  return result;
};

export const addFamilyMembers = async (surveyId, familyMembers, connection) => {
  if (!familyMembers || familyMembers.length === 0) return null;
  
  const familyMemberValues = familyMembers.map(member => [
    surveyId,
    member.firstName || '',
    member.middleName || '',
    member.lastName || '',
    member.suffix || '',
    member.birthdate ? member.birthdate.split('T')[0] : null, // Convert to 'YYYY-MM-DD'
    member.age,
    member.civilStatus,
    member.relationFamilyHead || '',
    member.educationalAttainment || '',
    member.occupation || '',
    member.skillsTraining || '',
    member.employmentType || '',
    member.philhealthNumber || '',
    parseFloat(member.monthlyIncome) || 0,
    member.healthStatus || '',
    member.remarks || ''
  ]);
  
  const [result] = await connection.query(
    `INSERT INTO FamilyProfile
     (surveyID, firstName, middleName, lastName, suffix, birthdate,
     age, civilStatus, relationToFamilyHead, educationalAttainment,
     occupation, skillsTraining, employmentType, philhealthNumber,
     monthlyIncome, healthStatus, remarks) 
     VALUES ?`,
    [familyMemberValues]
  );
  
  return result;
};

export const addExpenses = async (surveyId, foodExpenses, educationExpenses, familyExpenses, monthlyExpenses, connection) => {
  
  const expenseCategories = {
    food: foodExpenses,
    education: educationExpenses,
    family: familyExpenses,
    monthly: monthlyExpenses
  };

  for (const [category, expenses] of Object.entries(expenseCategories)) {
    if (expenses?.expenses) {
      const expenseValues = Object.entries(expenses.expenses).map(([item, amount]) => [
        surveyId,
        item,
        category,
        parseFloat(amount) || 0
    ]);

      await connection.query(
        `INSERT INTO expenses 
         (surveyID, expenses, expensesType, amount) 
         VALUES ?`,
        [expenseValues]
      );
    }
  }
};

export const addHouseInfo = async (surveyId, houseInfo, houseImageBuffer, connection) => {
  if (!houseInfo) return null;
  console.log("Storing image of size:", houseImageBuffer ? houseImageBuffer.length : 0);

  await connection.query(
    `INSERT INTO HouseInformation
     (surveyID, houseCondition, houseStructure, houseImage, latitude, longitude) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      surveyId,
      houseInfo.houseCondition,
      houseInfo.houseStructure,
      houseImageBuffer,
      houseInfo.latitude,
      houseInfo.longitude
    ]
  );
};

export const addWaterInfo = async (surveyId, water, connection) => {
  if (!water) return null;
  
  await connection.query(
    `INSERT INTO WaterInformation
     (surveyID, waterAccess, potableWater, waterSources) 
     VALUES (?, ?, ?, ?)`,
    [
      surveyId,
      water.accessWater,
      water.potableWater,
      water.sourceWater
    ]
  );
};

export const addLivestock = async (surveyId, livestock, connection) => {
  if (!livestock || Object.keys(livestock).length === 0) {
    console.log('No livestock data to insert');
    return null;
  }
  
  const livestockValues = Object.entries(livestock).map(([animal, data]) => {
    // Extract the values and convert to integers
    const totalNumber = parseInt(data.number) || 0;
    const own = parseInt(data.own) || 0;
    const dispersal = parseInt(data.dispersal) || 0;
    
    return [
      surveyId,
      animal,
      totalNumber,
      own,
      dispersal
    ];
  });

  if (livestockValues.length > 0) {
    await connection.query(
      `INSERT INTO Livestock 
      (surveyID, livestock, totalNumber, own, dispersal) 
      VALUES ?`,
      [livestockValues]
    );
  }
};

export const addFarmlots = async (surveyId, farmlots, connection) => {
  if (!farmlots) return null;

  await connection.query(
    `INSERT INTO Farmlots
     (surveyID, cultivation, pastureland, forestland) 
     VALUES (?, ?, ?, ?)`,
    [
      surveyId,
      farmlots.cultivation || 0,
      farmlots.pastureland || 0,
      farmlots.forestland || 0
    ]
  );
};

export const addCropsPlanted = async (surveyId, cropsPlanted, connection) => {
  if (!cropsPlanted || !cropsPlanted.crops || Object.keys(cropsPlanted.crops).length === 0) {
    console.log('No crops planted data to insert');
    return null;
  }

  const cropsPlantedValues = Object.entries(cropsPlanted.crops)
    .filter(([crop, size]) => size && size.trim() !== '')
    .map(([crop, size]) => [
      surveyId,
      crop,
      parseInt(size) || 0
    ]);

  if (cropsPlantedValues.length > 0) {
    await connection.query(
      `INSERT INTO CropsPlanted (surveyID, crops, size) VALUES ?`,
      [ cropsPlantedValues ]
    );
  }
};

export const addFruitBearingTree = async (surveyId, treeData, connection) => {

  if (!treeData || !treeData.tree || Object.keys(treeData.tree).length === 0) {
    console.log('No fruit bearing tree data to insert');
    return null;
  }

  const fruitBearingTreeValues = Object.entries(treeData.tree)
    .filter(([tree, totalNumber]) => totalNumber && totalNumber.trim() !== '')
    .map(([tree, totalNumber]) => [
      surveyId,
      tree,
      parseInt(totalNumber) || 0
    ]);

    if(fruitBearingTreeValues.length > 0) {
      await connection.query(
        `INSERT INTO FruitBearingTree (surveyID, tree, totalNumber) VALUES ?`,
        [ fruitBearingTreeValues ]
      );
    }
};

export const addFamilyResources = async (surveyId, resourcesData, connection) => {

  if (!resourcesData || !resourcesData.resources || Object.keys(resourcesData.resources).length === 0) {
    console.log('No family resources data to insert');
    return null;
  }

  const familyResourcesValues = Object.entries(resourcesData.resources)
    .filter(([resource, amount]) => amount && amount.trim() !== '') // Only insert non-empty values
    .map(([resource, amount]) => [
      surveyId,
      resource,
      parseFloat(amount) || 0
    ]);

    if(familyResourcesValues.length > 0) {
      await connection.query(
        `INSERT INTO FamilyResources (surveyID, resources, amount) VALUES ?`,
        [ familyResourcesValues ]
      );
    }
};

export const addAppliancesOwn = async (surveyId, appliancesData, connection) => {

  if (!appliancesData || !appliancesData.appliances || Object.keys(appliancesData.appliances).length === 0) {
    console.log('No appliances data to insert');
    return null;
  }

  const appliancesOwnValues = Object.entries(appliancesData.appliances)
    .filter(([appliance, totalAppliances]) => totalAppliances && totalAppliances.trim() !== '') // Only insert non-empty values
    .map(([appliance, totalAppliances]) => [
      surveyId,
      appliance,
      parseInt(totalAppliances) || 0
    ]);

    if(appliancesOwnValues.length > 0) {
      await connection.query(
        `INSERT INTO AppliancesOwn (surveyID, appliances, totalAppliances) VALUES ?`,
        [ appliancesOwnValues ]
      );
    }
};

export const addAmenities = async (surveyId, amenities, connection) => {

  if (amenities?.amenities) {
    const amenitiesValues = Object.entries(amenities.amenities).map(([amenity, totalAmenities]) => [
      surveyId,
      amenity,
      parseInt(totalAmenities) || 0
    ]);

    if(amenitiesValues.length > 0) {
      await connection.query(
        `INSERT INTO Amenities (surveyID, amenities, totalAmenities) VALUES ?`,
        [ amenitiesValues ]
      );
    }
  }
};

export const addCommunityIssues = async (surveyId, communityData, connection) => {

  if (!communityData || !communityData.issue) {
    console.log('No community issues data to insert');
    return null;
  }

  await connection.query(
    `INSERT INTO CommunityIssues (surveyID, issues) VALUES (?, ?)`,
    [ surveyId, communityData.issue || 'N/A' ]
  );
};

export const addServiceAvailed = async (surveyId, serviceAvailed, connection) => {
  if (!serviceAvailed || serviceAvailed.length === 0) return null;
  
  const serviceAvailedValues = serviceAvailed.map(service => [
    surveyId,
    service.date,
    service.ngo,
    service.assistance,
    parseInt(service.male),
    parseInt(service.female),
    parseInt(service.total),
    service.howServiceHelp
  ]);
  
  if(serviceAvailedValues.length > 0) {
    const [result] = await connection.query(
      `INSERT INTO ServiceAvailed
       (surveyID, dateServiceAvailed, ngoName, serviceAvailed,
        maleServed, femaleServed, totalServed, howServiceHelp) 
       VALUES ?`,
      [serviceAvailedValues]
    );
    
    return result;
  }

  return null;
};
 
export const addGovernmentAffiliation = async (surveyId, affiliation, connection) => {
  if (!affiliation || affiliation.length === 0) return null;
  
  const affiliationValues = affiliation.map(aff => [
    surveyId,
    aff.name,
    aff.officer,
    aff.member,
    aff.organization
  ]);
  
  if(affiliationValues.length > 0) {
    const [result] = await connection.query(
      `INSERT INTO GovernmentAffiliation
       (surveyID, nameAffiliated, asOfficer, asMember, organizationName) 
       VALUES ?`,
      [affiliationValues]
    );

    return result;
  }

  return null;
};

export const addNonIvatan = async (surveyId, nonIvatan, connection) => {
  if (!nonIvatan || nonIvatan.length === 0) return null;
  
  const nonIvatanValues = nonIvatan.map(ipula => [
    surveyId,
    ipula.name,
    ipula.settlement,
    ipula.ethnicity,
    ipula.origin,
    ipula.transient,
    ipula.houseOwner,
    ipula.transientRegistered,
    (!ipula.transientDateRegistered || ipula.transientDateRegistered === 'N/A' || ipula.transientDateRegistered.trim() === '')
      ? null
      : ipula.transientDateRegistered.split('T')[0]
  ]);
  
  if (nonIvatanValues.length > 0) {
    const [result] = await connection.query(
      `INSERT INTO NonIvatan
       (surveyID, ipulaName, settlementDetails, ethnicity, placeOfOrigin,
        isTransient, houseOwner, isRegistered, dateRegistered) 
       VALUES ?`,
      [nonIvatanValues]
    );

    return result;
  } 
  
  return null;
};



