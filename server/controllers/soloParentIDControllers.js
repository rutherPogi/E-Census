import pool from '../config/database.js';
import * as soloParentIDModel from '../models/soloParentIDModel.js';

export const getNewSoloParentId = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const soloParentID = await soloParentIDModel.generateSoloParentId(connection);
    
    res.status(200).json({ 
      success: true, 
      soloParentID: soloParentID 
    });
    
  } catch (error) {
    console.error('Error generating Solo Parent ID:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error generating Solo Parent ID', 
      error: error.message 
    });
  } finally {
    connection.release();
  }
};

export const submitSoloParentID = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const applicationData = JSON.parse(req.body.applicationData);
    const soloParentID = applicationData.personalInfo.soloParentID;

    const photoIDFile = req.files?.photoID?.[0];
    const signatureFile = req.files?.signature?.[0];

    console.log("Step 1");
    await soloParentIDModel.createSoloParentApplicant(
      soloParentID, 
      applicationData.applicationDetails, 
      photoIDFile.buffer,
      signatureFile.buffer,
      connection);

    console.log("Step 2");
    await soloParentIDModel.addPersonalInfo(soloParentID, applicationData.personalInfo, connection);

    console.log("Step 3");
    await soloParentIDModel.addContactInfo(soloParentID, applicationData.contactInfo, connection);

    console.log("Step 4");
    await soloParentIDModel.addProfessionalInfo(soloParentID, applicationData.professionalInfo, connection);

    console.log("Step 5");
    await soloParentIDModel.addOtherInfo(soloParentID, applicationData.otherInfo, connection);

    console.log("Step 6");
    await soloParentIDModel.addHouseholdComposition(soloParentID, applicationData.householdComposition, connection);

    console.log("Step 7");
    await soloParentIDModel.addProblemNeeds(soloParentID, applicationData.problemNeeds, connection);

    console.log("Step 8");
    await soloParentIDModel.addEmergencyContact(soloParentID, applicationData.emergencyContact, connection);

    await connection.commit();
    res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully', 
      soloParentID 
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

export const manageSoloParentId = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM spApplication ORDER BY dateApplied ASC`);
    
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