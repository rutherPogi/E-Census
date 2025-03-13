import pool from '../config/database.js';

export const generatePwdId = async (connection) => {
  // Get current date components
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Last 2 digits of year
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month (01-12)
  const datePrefix = `${year}${month}`;
  
  try {
    // Get the current sequence for today
    const [rows] = await connection.query(
      `SELECT MAX(pwdApplicantID) as maxId FROM pwdApplication 
       WHERE pwdApplicantID LIKE ?`,
      [`PWD${datePrefix}%`]
    );
    
    let sequence = 1;
    if (rows[0].maxId) {
      // Extract the sequence number from the existing ID
      const currentSequence = parseInt(rows[0].maxId.toString().slice(9));
      sequence = currentSequence + 1;
    }
    
    // Format as YYMMDDXXXX where XXXX is the sequence number
    const sequenceStr = sequence.toString().padStart(4, '0');
    const pwdID = `PWD${datePrefix}${sequenceStr}`;
    
    // Verify this ID doesn't already exist (double-check)
    const [existingCheck] = await connection.query(
      `SELECT COUNT(*) as count FROM pwdApplication WHERE pwdApplicantID = ?`,
      [pwdID]
    );
    
    if (existingCheck[0].count > 0) {
      // In the unlikely event of a collision, recursively try again
      return generatePwdId(connection);
    }
    return pwdID;
  } catch (error) {
    console.error('Error generating pwd ID:', error);
    throw error;
  }
};

export const createPWDApplicant = async (applicantData, photoID, reportingUnit, connection) => {

  const [result] = await connection.query(
    `INSERT INTO pwdApplication (pwdApplicantID, dateApplied, photoImage, reportingUnit, controlNumber)
     VALUES (?, CURDATE(), ?, ?, ?)`,
    [ applicantData.pwdID, 
      photoID.image.base64,
      reportingUnit.office,  
      reportingUnit.controlNumber ]
  );

  return result;
};

export const addPersonalInfo = async (pwdID, personalInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO pwdPersonalInformation 
    (pwdApplicantID, firstName, middleName, lastName, suffix, civilStatus, pwdNumber)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [ pwdID, 
      personalInfo.firstName,  
      personalInfo.middleName,
      personalInfo.lastName,
      personalInfo.suffix,
      personalInfo.civilStatus,
      personalInfo.pwdNumber ]
  );

  return result;
};

export const addDisabilityInfo = async (pwdID, disabilityInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO pwdDisabilityInformation (pwdApplicantID, disabilityType, disabilityCause)
     VALUES (?, ?, ?)`,
    [ pwdID, 
      disabilityInfo.disabilityType,  
      disabilityInfo.disabilityCause ]
  );

  return result;
};

export const addContactInfo = async (pwdID, contactInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO pwdContactInformation 
    (pwdApplicantID, street, barangay, municipality, province, region,
     landlineNumber, mobileNumber, emailAddress)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [ pwdID, 
      contactInfo.street,  
      contactInfo.barangay,
      contactInfo.municipality,
      contactInfo.province, 
      contactInfo.region, 
      contactInfo.landlineNumber, 
      contactInfo.mobileNumber, 
      contactInfo.emailAddress
    ]
  );

  return result;
};

export const addProfessionalInfo = async (pwdID, professionalInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO pwdProfessionalInformation 
    (pwdApplicantID, educationalAttainment, employmentStatus, employmentCategory, employmentTypes, occupation)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [ pwdID, 
      professionalInfo.educationalAttainment,  
      professionalInfo.employmentStatus,
      professionalInfo.employmentCategory,
      professionalInfo.employmentTypes, 
      professionalInfo.occupation
    ]
  );

  return result;
};

export const addOrganizationInfo = async (pwdID, organizationInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO pwdOrganizationInformation 
    (pwdApplicantID, organizationAffiliated, contactPerson, officeAddress, telephoneNumber)
     VALUES (?, ?, ?, ?, ?)`,
    [ pwdID, 
      organizationInfo.organizationAffiliated,  
      organizationInfo.contactPerson,
      organizationInfo.officeAddress,
      organizationInfo.telephoneNumber 
    ]
  );

  return result;
};

export const addIDReferenceNumber = async (pwdID, idReferenceNumber, connection) => {

  const [result] = await connection.query(
    `INSERT INTO pwdIDReferenceNumber
    (pwdApplicantID, sssNumber, gsisNumber, pagibigNumber, psnNumber, philhealthNumber)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [ pwdID, 
      idReferenceNumber.sssNumber,  
      idReferenceNumber.gsisNumber,
      idReferenceNumber.pagibigNumber,
      idReferenceNumber.psnNumber, 
      idReferenceNumber.philhealthNumber
    ]
  );

  return result;
};


export const addFamilyBackground = async (pwdID, familyBackground, connection) => {

  const [result] = await connection.query(
    `INSERT INTO pwdFamilyBackground
    ( pwdApplicantID, 
      fatherFirstName, fatherMiddleName, fatherLastName, fatherSuffix,
      motherFirstName, motherMiddleName, motherLastName,
      guardianFirstName, guardianMiddleName, guardianLastName, guardianSuffix )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [ pwdID, 
      familyBackground.fatherFirstName, 
      familyBackground.fatherMiddleName, 
      familyBackground.fatherLastName, 
      familyBackground.fatherSuffix,
      familyBackground.motherFirstName, 
      familyBackground.motherMiddleName, 
      familyBackground.motherLastName,
      familyBackground.guardianFirstName, 
      familyBackground.guardianMiddleName, 
      familyBackground.guardianLastName, 
      familyBackground.guardianSuffix
    ]
  );

  return result;
};

export const addAccomplishedBy = async (pwdID, accomplishedBy, connection) => {

  const [result] = await connection.query(
    `INSERT INTO pwdAccomplishedBy
    ( pwdApplicantID, 
      applicantFirstName, applicantMiddleName, applicantLastName, applicantSuffix,
      repFirstName, repMiddleName, repLastName,  repSuffix,
      guardianFirstName, guardianMiddleName, guardianLastName, guardianSuffix )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [ pwdID, 
      accomplishedBy.applicantFirstName, 
      accomplishedBy.applicantMiddleName, 
      accomplishedBy.applicantLastName, 
      accomplishedBy.applicantSuffix,
      accomplishedBy.repFirstName, 
      accomplishedBy.repMiddleName, 
      accomplishedBy.repLastName,
      accomplishedBy.repSuffix,
      accomplishedBy.guardianFirstName, 
      accomplishedBy.guardianMiddleName, 
      accomplishedBy.guardianLastName, 
      accomplishedBy.guardianSuffix
    ]
  );

  return result;
};

export const addOtherInformation = async (pwdID, otherInfo, connection) => {

  const [result] = await connection.query(
    `INSERT INTO pwdOtherInformation
    ( pwdApplicantID, 
      cpFirstName, cpMiddleName, cpLastName, cpSuffix, license,
      poFirstName, poMiddleName, poLastName, poSuffix,
      aoFirstName, aoMiddleName, aoLastName, aoSuffix,
      eFirstName, eMiddleName, eLastName, eSuffix )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [ pwdID, 
      otherInfo.cpFirstName, 
      otherInfo.cpMiddleName, 
      otherInfo.cpLastName, 
      otherInfo.cpSuffix,
      otherInfo.license,
      otherInfo.poFirstName, 
      otherInfo.poMiddleName, 
      otherInfo.poLastName, 
      otherInfo.poSuffix,
      otherInfo.aoFirstName, 
      otherInfo.aoMiddleName, 
      otherInfo.aoLastName, 
      otherInfo.aoSuffix,
      otherInfo.eFirstName, 
      otherInfo.eMiddleName, 
      otherInfo.eLastName, 
      otherInfo.eSuffix
      ]
  );

  return result;
};