import pool from '../config/database.js';
import * as pwdIDModel from '../models/pwdIDModel.js';

export const getNewPwdId = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const pwdID = await pwdIDModel.generatePwdId(connection);
    
    res.status(200).json({ 
      success: true, 
      pwdID: pwdID 
    });
    
  } catch (error) {
    console.error('Error generating PWD ID:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error generating PWD ID', 
      error: error.message 
    });
  } finally {
    connection.release();
  }
};

export const submitPwdId = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const applicationData = JSON.parse(req.body.applicationData);
    const pwdID = applicationData.personalInfo.pwdID;
    console.log(pwdID);

    const photoIDFile = req.files?.photoID?.[0];
    const signatureFile = req.files?.signature?.[0];

    // 1. Insert PWD Application Data
    console.log("Step 1");
    await pwdIDModel.createPWDApplicant(
      applicationData.personalInfo,
      applicationData.reportingUnit,
      photoIDFile.buffer,
      signatureFile.buffer,
      connection
    );

    console.log("Step 2");
    await pwdIDModel.addPersonalInfo(pwdID, req.body.personalInfo, connection);

    console.log("Step 3");
    await pwdIDModel.addDisabilityInfo(pwdID, req.body.disabilityInfo, connection);

    console.log("Step 4");
    await pwdIDModel.addContactInfo(pwdID, req.body.contactInfo, connection);

    console.log("Step 5");
    await pwdIDModel.addProfessionalInfo(pwdID, req.body.professionalInfo, connection);

    console.log("Step 6");
    await pwdIDModel.addOrganizationInfo(pwdID, req.body.organizationInfo, connection);

    console.log("Step 7");
    await pwdIDModel.addIDReferenceNumber(pwdID, req.body.idReferenceInfo, connection);

    console.log("Step 8");
    await pwdIDModel.addFamilyBackground(pwdID, req.body.familyBackground, connection);

    console.log("Step 9");
    await pwdIDModel.addAccomplishedBy(pwdID, req.body.accomplishedBy, connection);

    console.log("Step 10");
    await pwdIDModel.addOtherInformation(pwdID, req.body.otherInfo, connection);

    
    await connection.commit();
    res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully', 
      pwdID 
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error submitting application:', {
      message: error.message,
      stack: error.stack,
      /*requestBody: JSON.stringify(req.body, null, 2)*/
    });

    res.status(500).json({ 
      success: false, 
      message: 'Error submitting application', 
      error: error.message,
      details: error.stack
    });

  } finally {
    connection.release();
  }
}; 

export const managePwdId = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM pwdApplication ORDER BY dateApplied ASC`);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching Application data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching Application data', 
      error: error.message 
    });
  }
}


export const findPwdID = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    console.log('Finding Person ...');
    console.log('Search params:', req.body);
    
    // Get search parameters from request body (since we're using POST)
    const { firstName, middleName, lastName, suffix, birthdate, sex } = req.body;
    
    // Validate required parameters
    if (!firstName || !lastName || !birthdate || !sex) {
      return res.status(400).json({
        success: false,
        message: 'Missing required search parameters'
      });
    }
    
    // Build the query with appropriate AND conditions
    const [population] = await connection.query(`
      SELECT 
        p.populationID,
        p.isPWD,
        pi.personalInfoID,
        pi.firstName,
        pi.middleName,
        pi.lastName,
        pi.suffix,
        pi.birthdate,
        pi.sex,
        pi.pwdIDNumber
      FROM Population p
      LEFT JOIN PersonalInformation pi ON p.populationID = pi.populationID
      WHERE pi.firstName = ?
        AND pi.middleName = ?
        AND pi.lastName = ?
        AND pi.birthdate = ?
        AND pi.sex = ?
    `, [firstName, middleName, lastName, birthdate ? birthdate : null, sex]);

    console.log(`Found ${population.length} results`);

    res.status(200).json({ 
      success: true,
      population 
    });

  } catch (error) {
    console.error('Error finding person:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error finding person', 
      error: error.message 
    });
  } finally {
    connection.release();
  }
};

export const getPersonDetails = async (req, res) => {

  const connection = await pool.getConnection();
  const populationID = req.params.populationID || req.query.populationID;

  try {

    console.log('Retrieving Population');
    const [population] = await connection.query(`
      SELECT 
        p.populationID,
        p.surveyID,
        p.philhealthNumber,
        p.healthStatus,
        p.remarks,
        p.isOSY,
        p.inSchool,
        p.outOfTown,
        p.isOFW,
        p.isPWD,
        p.isSoloParent,

        pi.personalInfoID,
        pi.firstName,
        pi.middleName,
        pi.lastName,
        pi.suffix,
        pi.birthdate,
        pi.age,
        pi.sex,
        pi.birthplace,
        pi.religion,
        pi.civilStatus,
        pi.relationToFamilyHead,
        pi.pwdIDNumber,

        prof.professionalInfoID,
        prof.educationalAttainment,
        prof.skills,
        prof.occupation,
        prof.company,
        prof.employmentStatus,
        prof.employmentCategory,
        prof.employmentType,
        prof.monthlyIncome,
        prof.annualIncome,

        ci.contactInfoID,
        ci.street,
        ci.barangay,
        ci.municipality,
        ci.province,
        ci.region,
        ci.mobileNumber,
        ci.landlineNumber,
        ci.emailAddress,

        ga.governmentAffiliationID,
        ga.isAffiliated,
        ga.asOfficer,
        ga.asMember,
        ga.organizationAffiliated,

        ni.nonIvatanID,
        ni.isIpula,
        ni.settlementDetails,
        ni.ethnicity,
        ni.placeOfOrigin,
        ni.isTransient,
        ni.houseOwner,
        ni.isRegistered,
        ni.dateRegistered

      FROM Population p
      LEFT JOIN PersonalInformation pi ON p.populationID = pi.populationID
      LEFT JOIN ProfessionalInformation prof ON p.populationID = prof.populationID
      LEFT JOIN ContactInformation ci ON p.populationID = ci.populationID
      LEFT JOIN GovernmentAffiliation ga ON p.populationID = ga.populationID
      LEFT JOIN NonIvatan ni ON p.populationID = ni.populationID

      WHERE p.populationID = ?
    `, [populationID]);

    res.status(200).json({ population });

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

