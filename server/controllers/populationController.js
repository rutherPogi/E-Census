import pool from '../config/database.js';



export const managePopulation = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM FamilyProfile ORDER BY surveyID ASC`);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching population:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching population', 
      error: error.message 
    });
  }
}