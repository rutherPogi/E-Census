import pool from '../config/database.js';

export const generateSoloParentId = async (connection) => {
  // Get current date components
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Last 2 digits of year
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month (01-12)
  const datePrefix = `${year}${month}`;
  
  try {
    // Get the current sequence for today
    const [rows] = await connection.query(
      `SELECT MAX(spApplicantID) as maxId FROM spApplication 
       WHERE spApplicantID LIKE ?`,
      [`SP${datePrefix}%`]
    );
    
    let sequence = 1;
    if (rows[0].maxId) {
      // Extract the sequence number from the existing ID
      const currentSequence = parseInt(rows[0].maxId.toString().slice(9));
      sequence = currentSequence + 1;
    }
    
    // Format as YYMMDDXXXX where XXXX is the sequence number
    const sequenceStr = sequence.toString().padStart(4, '0');
    const soloParentID = `SP${datePrefix}${sequenceStr}`;
    
    // Verify this ID doesn't already exist (double-check)
    const [existingCheck] = await connection.query(
      `SELECT COUNT(*) as count FROM spApplication WHERE spApplicantID = ?`,
      [soloParentID]
    );
    
    if (existingCheck[0].count > 0) {
      // In the unlikely event of a collision, recursively try again
      return generateSoloParentId(connection);
    }
    return soloParentID;
  } catch (error) {
    console.error('Error generating Solo Parent ID:', error);
    throw error;
  }
};

export const createSoloParentApplicant = async (soloParentID, applicationDetails, connection) => {
  
  const [result] = await connection.query(
    `INSERT INTO spApplication (spApplicantID, dateApplied, idCardNumber, category, beneficiaryCode)
     VALUES (?, CURDATE(), ?, ?, ?)`,
    [ soloParentID, 
      applicationDetails.cardNumber,
      applicationDetails.category,
      applicationDetails.beneficiaryCode
    ]
  );

  return result;
};

export const addPersonalInfo = async (soloParentID, personalInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO spPersonalInformation 
    (spApplicantID, firstName, middleName, lastName, suffix, birthdate, age, sex, civilStatus, birthplace,
     religion, philsysNumber)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [ soloParentID, 
      personalInfo.firstName,  
      personalInfo.middleName,
      personalInfo.lastName,
      personalInfo.suffix,
      personalInfo.birthdate ? personalInfo.birthdate.split('T')[0] : null,,
      parseInt(personalInfo.age),
      personalInfo.sex,
      personalInfo.civilStatus,
      personalInfo.birthplace,
      personalInfo.religion,
      personalInfo.philsysNumber ]
  );

  return result;
};

export const addContactInfo = async (soloParentID, contactInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO spContactInformation 
    (spApplicantID, street, barangay, municipality, province, mobileNumber, emailAddress)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [ soloParentID, 
      contactInfo.street,  
      contactInfo.barangay,
      contactInfo.municipality,
      contactInfo.province,
      contactInfo.mobileNumber,
      contactInfo.emailAddress ]
  );

  return result;
};

export const addProfessionalInfo = async (soloParentID, professionalInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO spProfessionalInformation 
    (spApplicantID, occupation, company, educationalAttainment, monthlyIncome, employmentStatus)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [ soloParentID, 
      professionalInfo.occupation,  
      professionalInfo.company,  
      professionalInfo.educationalAttainment,
      parseFloat(professionalInfo.monthlyIncome),
      professionalInfo.employmentStatus ]
  );

  return result;
};

export const addOtherInfo = async (soloParentID, otherInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO spOtherInformation 
    (spApplicantID, isBeneficiary, isIndigenous, isLGBTQ, isPWD, householdID, affiliationName)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [ soloParentID, 
      otherInfo.beneficiary,  
      otherInfo.indigenous,  
      otherInfo.lgbtq,
      otherInfo.pwd,
      otherInfo.householdID,
      otherInfo.affiliationName ]
  );

  return result;
};

export const addHouseholdComposition = async (soloParentID, householdComposition, connection) => {

  if (!householdComposition || householdComposition.length === 0) return null;

  const householdCompositionValues = householdComposition.map(member => [
    soloParentID,
    member.firstName,
    member.middleName,
    member.lastName,
    member.suffix,
    member.sex,
    member.relationship,
    member.birthdate ? member.birthdate.split('T')[0] : null,
    member.age,
    member.civilStatus,
    member.educationalAttainment,
    member.occupation,
    parseFloat(member.monthlyIncome)
  ]);

  const [result] = await connection.query(
    `INSERT INTO spHouseholdComposition 
    (spApplicantID, firstName, middleName, lastName, suffix, sex, relationship, birthdate, 
     age, civilStatus, educationalAttainment, occupation, monthlyIncome)
     VALUES ?`,
    [ householdCompositionValues ]
  );

  return result;
};

export const addProblemNeeds = async (soloParentID, problemNeeds, connection) => {

  const [result] = await connection.query(
    `INSERT INTO spProblemNeeds
    (spApplicantID, causeSoloParent, needsSoloParent)
     VALUES (?, ?, ?)`,
    [ soloParentID, 
      problemNeeds.causeSoloParent,
      problemNeeds.needsSoloParent ]
  );

  return result;
};

export const addEmergencyContact = async (soloParentID, emergencyContact, connection) => {

  const [result] = await connection.query(
    `INSERT INTO spEmergencyContact
    (spApplicantID, name, relationship, street, barangay, municipality, province, mobileNumber)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [ soloParentID, 
      emergencyContact.name,
      emergencyContact.relationship,
      emergencyContact.street,  
      emergencyContact.barangay,
      emergencyContact.municipality,
      emergencyContact.province,
      emergencyContact.mobileNumber ]
  );

  return result;
};
