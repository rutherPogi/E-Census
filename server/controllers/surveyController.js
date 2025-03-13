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
    
    const surveyID = req.body.surveyData.surveyID;
    console.log("Processing survey ID:", surveyID);
    
    // 1. Insert Survey Data
    console.log("Step 1");
    await surveyModel.createSurvey(req.body.surveyData, connection);
    
    // 2. Insert Family Members
    console.log("Step 2");
    await surveyModel.addFamilyMembers(surveyID, req.body.familyMembers, connection);
    
    // 3. Insert Expenses
    console.log("Step 3");
    await surveyModel.addExpenses(
      surveyID, 
      req.body.foodExpenses, req.body.educationExpenses,
      req.body.familyExpenses, req.body.monthlyExpenses,
      connection
    );

    // 4. Insert House Info
    console.log("Step 4");
    await surveyModel.addHouseInfo(surveyID, req.body.houseInfo, connection);
    
    // 5. Insert Water Info
    console.log("Step 5");
    await surveyModel.addWaterInfo(surveyID, req.body.water, connection);

    // 6. Insert Livestock
    console.log("Step 6");
    await surveyModel.addLivestock(surveyID, req.body.livestock, connection);

    // 7. Insert FarmLots
    console.log("Step 7");
    await surveyModel.addFarmlots(surveyID, req.body.farmlots, connection);

    // 8. Insert Crops Planted
    console.log("Step 8");
    await surveyModel.addCropsPlanted(surveyID, req.body.cropsPlanted, connection);

    // 9. Insert Fruit Bearing Tree
    console.log("Step 9");
    await surveyModel.addFruitBearingTree(surveyID, req.body.fruitBearingTree, connection);

    // 10. Insert Family Resources
    console.log("Step 10");
    await surveyModel.addFamilyResources(surveyID, req.body.familyResources, connection);

    // 11. Insert Appliances Own
    console.log("Step 11");
    await surveyModel.addAppliancesOwn(surveyID, req.body.appliancesOwn, connection);

    // 12. Insert Other Amenities
    console.log("Step 12");
    await surveyModel.addAmenities(surveyID, req.body.amenitiesOwn, connection);

    // 13. Insert Community Issues
    console.log("Step 13");
    await surveyModel.addCommunityIssues(surveyID, req.body.communityIssues, connection);

    // 14. Insert Assistance/Service Availed
    console.log("Step 14");
    await surveyModel.addServiceAvailed(surveyID, req.body.serviceAvailed, connection);

    // 15. Insert Government Affiliation
    console.log("Step 15");
    await surveyModel.addGovernmentAffiliation(surveyID, req.body.affiliation, connection);

    // 16. Insert IPULA / Non-Ivatan
    console.log("Step 16");
    await surveyModel.addNonIvatan(surveyID, req.body.nonIvatan, connection);


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

