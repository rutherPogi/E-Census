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