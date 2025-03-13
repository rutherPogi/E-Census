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

    console.log('Request body:', JSON.stringify(req.body));
    console.log('Files:', req.files);
    console.log('photoSignature from body:', req.body.photoSignature);
    
    const seniorCitizenID = req.body.personalInfo.seniorCitizenID;
    console.log("Processing Application ID:", seniorCitizenID);
    
    console.log("Step 1");
    await seniorCitizenIDModel.createSeniorCitizenApplicant(seniorCitizenID, req.body.photoSignature, connection);

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