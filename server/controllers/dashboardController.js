import pool from '../config/database.js';

export const getTotal = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM SurveyResponses) AS TotalSurvey,
        (SELECT COUNT(DISTINCT surveyID) FROM FamilyProfile) AS TotalFamilies,
        (SELECT COUNT(*) FROM FamilyProfile) AS TotalPopulation,
        (SELECT COUNT(*) FROM HouseInformation) AS HouseRegistered,
        (SELECT COUNT(*) FROM pwdApplication) AS TotalPWDApplication,
        (SELECT COUNT(*) FROM spApplication) AS TotalSPApplication,
        (SELECT COUNT(*) FROM scApplication) AS TotalSCApplication
      `);

    console.log('Rows:', rows[0]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};