import pool from '../config/database.js';


export const generateSeniorCitizenId = async (connection) => {
  // Get current date components
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Last 2 digits of year
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month (01-12)
  const datePrefix = `${year}${month}`;
  
  try {
    // Get the current sequence for today
    const [rows] = await connection.query(
      `SELECT MAX(scApplicantID) as maxId FROM scApplication 
       WHERE scApplicantID LIKE ?`,
      [`SC${datePrefix}%`]
    );
    
    let sequence = 1;
    if (rows[0].maxId) {
      // Extract the sequence number from the existing ID
      const currentSequence = parseInt(rows[0].maxId.toString().slice(9));
      sequence = currentSequence + 1;
    }
    
    // Format as YYMMDDXXXX where XXXX is the sequence number
    const sequenceStr = sequence.toString().padStart(4, '0');
    const seniorCitizenID = `SC${datePrefix}${sequenceStr}`;
    
    // Verify this ID doesn't already exist (double-check)
    const [existingCheck] = await connection.query(
      `SELECT COUNT(*) as count FROM scApplication WHERE scApplicantID = ?`,
      [seniorCitizenID]
    );
    
    if (existingCheck[0].count > 0) {
      // In the unlikely event of a collision, recursively try again
      return generateSeniorCitizenId(connection);
    }
    return seniorCitizenID;
  } catch (error) {
    console.error('Error generating Senior Citizen ID:', error);
    throw error;
  }
};

export const createSeniorCitizenApplicant = async (seniorCitizenID, photoID, signature, connection) => {
  
  const [result] = await connection.query(
    `INSERT INTO scApplication (scApplicantID, dateApplied, issuedAt, issuedOn, photoID, signature)
     VALUES (?, CURDATE(), CURDATE(), CURDATE(), ?, ?)`,
    [ seniorCitizenID, 
      photoID,
      signature
    ]
  );

  return result;
};

export const addPersonalInfo = async (seniorCitizenID, personalInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO scPersonalInformation 
    (scApplicantID, firstName, middleName, lastName, suffix, birthdate, age, sex, civilStatus, birthplace)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [ seniorCitizenID, 
      personalInfo.firstName,  
      personalInfo.middleName,
      personalInfo.lastName,
      personalInfo.suffix,
      personalInfo.birthdate ? personalInfo.birthdate.split('T')[0] : null,,
      personalInfo.age,
      personalInfo.sex,
      personalInfo.civilStatus,
      personalInfo.birthplace ]
  );

  return result;
};

export const addContactInfo = async (seniorCitizenID, contactInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO scContactInformation 
    (scApplicantID, street, barangay, municipality, province, mobileNumber)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [ seniorCitizenID, 
      contactInfo.street,  
      contactInfo.barangay,
      contactInfo.municipality,
      contactInfo.province,
      contactInfo.mobileNumber ]
  );

  return result;
};

export const addProfessionalInfo = async (seniorCitizenID, professionalInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO scProfessionalInformation 
    (scApplicantID, occupation, educationalAttainment, annualIncome, otherSkills)
     VALUES (?, ?, ?, ?, ?)`,
    [ seniorCitizenID, 
      professionalInfo.occupation,  
      professionalInfo.educationalAttainment,
      professionalInfo.annualIncome,
      professionalInfo.otherSkills ]
  );

  return result;
};

export const addFamilyComposition = async (seniorCitizenID, familyComposition, connection) => {

  if (!familyComposition || familyComposition.length === 0) return null;

  const familyCompositionValues = familyComposition.map(member => [
    seniorCitizenID,
    member.firstName,
    member.middleName,
    member.lastName,
    member.suffix,
    member.age,
    member.relationship,
    member.civilStatus,
    member.occupation,
    parseFloat(member.income)
  ]);

  const [result] = await connection.query(
    `INSERT INTO scFamilyComposition 
    (scApplicantID, firstName, middleName, lastName, suffix, age, relationship, 
     civilStatus, occupation, income)
     VALUES ?`,
    [ familyCompositionValues ]
  );

  return result;
};

export const addOscaInfo = async (seniorCitizenID, OscaInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO scOscaInformation 
    (scApplicantID, associationName, asOfficer, position)
     VALUES (?, ?, ?, ?)`,
    [ seniorCitizenID, 
      OscaInfo.associationName,  
      OscaInfo.asOfficer ? OscaInfo.asOfficer.split('T')[0] : null,
      OscaInfo.position ]
  );

  return result;
};