// controllers/surveyController.js - Survey submission logic
import pool from '../config/database.js';
import * as surveyModel from '../models/surveyModel.js';

export const getNewSurveyId = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const surveyId = await surveyModel.generateSurveyId(connection);
    
    res.status(200).json({ 
      success: true, 
      surveyId: surveyId 
    });
    
  } catch (error) {
    console.error('Error generating survey ID:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error generating survey ID', 
      error: error.message 
    });
  } finally {
    connection.release();
  }
};

export const submitSurvey = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // Parse the surveyData JSON string
    const surveyData = JSON.parse(req.body.surveyData);
    const surveyID = surveyData.surveyData.surveyID;

    
    // 1. Insert Survey Data
    console.log("Step 1");
    await surveyModel.createSurvey(surveyData.surveyData, connection);
    
    // 2. Insert Family Members
    console.log("Step 2");
    await surveyModel.addFamilyMembers(surveyID, surveyData.familyMembers, connection);
    
    // 3. Insert Expenses
    console.log("Step 3");
    await surveyModel.addExpenses(
      surveyID, 
      surveyData.foodExpenses, surveyData.educationExpenses,
      surveyData.familyExpenses, surveyData.monthlyExpenses,
      connection
    );

    const houseImageFile = req.file ? req.file.fieldname || req.file.path : null;
    const houseImageBuffer = req.file ? req.file.buffer : null;
    console.log("Image buffer size:", req.file ? req.file.buffer.length : 0);

    // 4. Insert House Info
    console.log("Step 4");
    await surveyModel.addHouseInfo(
      surveyID, 
      surveyData.houseInfo, 
      houseImageBuffer,
      connection
    );
    
    // 5. Insert Water Info
    console.log("Step 5");
    await surveyModel.addWaterInfo(surveyID, surveyData.water, connection);

    // 6. Insert Livestock
    console.log("Step 6");
    await surveyModel.addLivestock(surveyID, surveyData.livestock, connection);

    // 7. Insert FarmLots
    console.log("Step 7");
    await surveyModel.addFarmlots(surveyID, surveyData.farmlots, connection);

    // 8. Insert Crops Planted
    console.log("Step 8");
    await surveyModel.addCropsPlanted(surveyID, surveyData.cropsPlanted, connection);

    // 9. Insert Fruit Bearing Tree
    console.log("Step 9");
    await surveyModel.addFruitBearingTree(surveyID, surveyData.fruitBearingTree, connection);

    // 10. Insert Family Resources
    console.log("Step 10");
    await surveyModel.addFamilyResources(surveyID, surveyData.familyResources, connection);

    // 11. Insert Appliances Own
    console.log("Step 11");
    await surveyModel.addAppliancesOwn(surveyID, surveyData.appliancesOwn, connection);

    // 12. Insert Other Amenities
    console.log("Step 12");
    await surveyModel.addAmenities(surveyID, surveyData.amenitiesOwn, connection);

    // 13. Insert Community Issues
    console.log("Step 13");
    await surveyModel.addCommunityIssues(surveyID, surveyData.communityIssues, connection);

    // 14. Insert Assistance/Service Availed
    console.log("Step 14");
    await surveyModel.addServiceAvailed(surveyID, surveyData.serviceAvailed, connection);

    // 15. Insert Government Affiliation
    console.log("Step 15");
    await surveyModel.addGovernmentAffiliation(surveyID, surveyData.affiliation, connection);

    // 16. Insert IPULA / Non-Ivatan
    console.log("Step 16");
    await surveyModel.addNonIvatan(surveyID, surveyData.nonIvatan, connection);


    await connection.commit();
    res.status(200).json({ 
      success: true, 
      message: 'Survey submitted successfully',
      surveyID 
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error submitting survey:', {
      message: error.message,
      stack: error.stack,
      requestBody: JSON.stringify(req.body, null, 2)
    });

    res.status(500).json({ 
      success: false, 
      message: 'Error submitting survey', 
      error: error.message,
      details: error.stack
    });

  } finally {
    connection.release();
  }
};

export const manageSurvey = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        sr.surveyID,
        sr.respondent,
        sr.interviewer,
        sr.surveyDate
      FROM 
        SurveyResponses sr
      ORDER BY 
        sr.surveyDate DESC
    `);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching survey data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching survey data', 
      error: error.message 
    });
  }
}

export const viewSurvey = async (req, res) => {
  const connection = await pool.getConnection();
  const surveyID = req.params.surveyID || req.query.surveyID;

  try {
    // 1. Get main survey data with joins to related tables
    const [surveyData] = await connection.query(`
      SELECT 
        sr.surveyID, sr.respondent, sr.interviewer, sr.surveyDate, 
        sr.barangay, sr.municipality, 
        sr.monthlyIncome, sr.irregularIncome, 
        sr.familyIncome,
        hi.houseCondition, hi.houseStructure,
        wi.waterAccess, wi.potableWater, wi.waterSources,
        f.cultivation, f.pastureland, f.forestland,
        ci.issues
      FROM SurveyResponses sr
      LEFT JOIN HouseInformation hi ON sr.surveyID = hi.surveyID
      LEFT JOIN WaterInformation wi ON sr.surveyID = wi.surveyID
      LEFT JOIN Farmlots f ON sr.surveyID = f.surveyID
      LEFT JOIN CommunityIssues ci ON sr.surveyID = ci.surveyID
      WHERE sr.surveyID = ?
    `, [surveyID]);

    // 2. Get family profile data
    const [familyProfile] = await connection.query(`
      SELECT * FROM FamilyProfile WHERE surveyID = ?
    `, [surveyID]);

    // 3. Get expenses data
    const [expenses] = await connection.query(`
      SELECT * FROM Expenses WHERE surveyID = ?
    `, [surveyID]);

    // 4. Get livestock data
    const [livestock] = await connection.query(`
      SELECT * FROM Livestock WHERE surveyID = ?
    `, [surveyID]);

    // 5. Get crops planted data
    const [cropsPlanted] = await connection.query(`
      SELECT * FROM CropsPlanted WHERE surveyID = ?
    `, [surveyID]);

    // 6. Get fruit bearing tree data
    const [fruitBearingTree] = await connection.query(`
      SELECT * FROM FruitBearingTree WHERE surveyID = ?
    `, [surveyID]);

    // 7. Get family resources data
    const [familyResources] = await connection.query(`
      SELECT * FROM FamilyResources WHERE surveyID = ?
    `, [surveyID]);

    // 8. Get appliances own data
    const [appliancesOwn] = await connection.query(`
      SELECT * FROM AppliancesOwn WHERE surveyID = ?
    `, [surveyID]);

    // 9. Get amenities data
    const [amenities] = await connection.query(`
      SELECT * FROM Amenities WHERE surveyID = ?
    `, [surveyID]);

    // 10. Get service availed data
    const [serviceAvailed] = await connection.query(`
      SELECT * FROM ServiceAvailed WHERE surveyID = ?
    `, [surveyID]);

    // 11. Get government affiliation data
    const [governmentAffiliation] = await connection.query(`
      SELECT * FROM GovernmentAffiliation WHERE surveyID = ?
    `, [surveyID]);

    // 12. Get non-Ivatan data
    const [nonIvatan] = await connection.query(`
      SELECT * FROM NonIvatan WHERE surveyID = ?
    `, [surveyID]);

    console.log('Survey Data: ', surveyData);
    console.log('Family Profile: ', familyProfile);
    console.log('Expenses: ', expenses);
    console.log('Livestock: ', livestock);
    console.log('Crops Planted: ', cropsPlanted);
    console.log('Fruit Bearing Tree: ', fruitBearingTree);
    console.log('Family Resources: ', familyResources);
    console.log('Appliances Own: ', appliancesOwn);
    console.log('Amenities: ', amenities);
    console.log('Service Availed: ', serviceAvailed);
    console.log('Government Affiliation: ', governmentAffiliation);
    console.log('Non Ivatan: ', nonIvatan);

    res.status(200).json({
      surveyData, 
      familyProfile,
      expenses,
      livestock,
      cropsPlanted,
      fruitBearingTree,
      familyResources,
      appliancesOwn,
      amenities,
      serviceAvailed,
      governmentAffiliation,
      nonIvatan
    });

  } catch (error) {
    console.error('Error fetching survey data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching survey data', 
      error: error.message 
    });
  } finally {
    connection.release();
  }
};

export const deleteSurvey = async (req, res) => {
  const connection = await pool.getConnection();
  const surveyID = req.params.surveyID;

  try {
    await connection.beginTransaction();
    
    // Delete from all related tables in reverse order of creation
    // This avoids foreign key constraint issues
    await connection.query('DELETE FROM NonIvatan WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM GovernmentAffiliation WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM ServiceAvailed WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM Amenities WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM AppliancesOwn WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM FamilyResources WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM FruitBearingTree WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM CropsPlanted WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM Farmlots WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM Livestock WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM WaterInformation WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM HouseInformation WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM Expenses WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM FamilyProfile WHERE surveyID = ?', [surveyID]);
    await connection.query('DELETE FROM CommunityIssues WHERE surveyID = ?', [surveyID]);
    
    // Finally delete the main survey record
    await connection.query('DELETE FROM SurveyResponses WHERE surveyID = ?', [surveyID]);
    
    await connection.commit();
    
    res.status(200).json({ 
      success: true, 
      message: 'Survey deleted successfully' 
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error deleting survey:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting survey', 
      error: error.message 
    });
  } finally {
    connection.release();
  }
};

