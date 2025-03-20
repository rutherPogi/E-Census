import pool from '../config/database.js';


// Get all posts
export const getCoordinates = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM HouseInformation`);

    const processedRows = rows.map(row => {
      let processedRow = {...row};

      if (row.houseImage) {
        // Add proper image data URL prefix
        processedRow.houseImage = `data:image/jpeg;base64,${Buffer.from(row.houseImage).toString('base64')}`;
      }
      
      return processedRow;
    });
    
    res.json(processedRows);
  } catch (error) {
    console.error('Error getting House Information:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


