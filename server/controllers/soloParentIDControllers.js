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
    
    const soloParentID = req.body.personalInfo.soloParentID;
    console.log("Processing Application ID:", soloParentID);
    
    console.log("Step 1");
    await soloParentIDModel.createSoloParentApplicant(soloParentID, req.body.applicationDetails, connection);

    console.log("Step 2");
    await soloParentIDModel.addPersonalInfo(soloParentID, req.body.personalInfo, connection);

    console.log("Step 3");
    await soloParentIDModel.addContactInfo(soloParentID, req.body.contactInfo, connection);

    console.log("Step 4");
    await soloParentIDModel.addProfessionalInfo(soloParentID, req.body.professionalInfo, connection);

    console.log("Step 5");
    await soloParentIDModel.addOtherInfo(soloParentID, req.body.otherInfo, connection);

    console.log("Step 6");
    await soloParentIDModel.addHouseholdComposition(soloParentID, req.body.householdComposition, connection);

    console.log("Step 7");
    await soloParentIDModel.addProblemNeeds(soloParentID, req.body.problemNeeds, connection);

    console.log("Step 8");
    await soloParentIDModel.addEmergencyContact(soloParentID, req.body.emergencyContact, connection);

    
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