import pool from '../config/database.js';
import * as seniorCitizenIDModel from '../models/seniorCitizenIDModel.js';

export const getNewSeniorCitizenId = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const seniorCitizenID = await seniorCitizenIDModel.generateSeniorCitizenId(connection);
    
    res.status(200).json({ 
      success: true, 
      seniorCitizenID: seniorCitizenID 
    });
    
  } catch (error) {
    console.error('Error generating Senior Citizen ID:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error generating Senior Citizen ID', 
      error: error.message 
    });
  } finally {
    connection.release();
  }
};

export const submitSeniorCitizenID = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    const applicationData = JSON.parse(req.body.applicationData);
    const seniorCitizenID = applicationData.personalInfo.seniorCitizenID;

    const photoIDFile = req.files?.photoID?.[0];
    const signatureFile = req.files?.signature?.[0];
    
    console.log("Step 1");
    await seniorCitizenIDModel.createSeniorCitizenApplicant(
      seniorCitizenID, 
      photoIDFile.buffer,
      signatureFile.buffer,
      connection
    );

    console.log("Step 2");
    await seniorCitizenIDModel.addPersonalInfo(seniorCitizenID, req.body.personalInfo, connection);

    console.log("Step 3");
    await seniorCitizenIDModel.addContactInfo(seniorCitizenID, req.body.contactInfo, connection);

    console.log("Step 4");
    await seniorCitizenIDModel.addProfessionalInfo(seniorCitizenID, req.body.professionalInfo, connection);

    console.log("Step 5");
    await seniorCitizenIDModel.addFamilyComposition(seniorCitizenID, req.body.familyComposition, connection);

    console.log("Step 6");
    await seniorCitizenIDModel.addOscaInfo(seniorCitizenID, req.body.oscaMembership, connection);

    
    await connection.commit();
    res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully', 
      seniorCitizenID 
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

export const manageSeniorCitizenId = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM scApplication ORDER BY dateApplied ASC`);
    
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