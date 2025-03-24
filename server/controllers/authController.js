import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';
import * as userModel from '../models/userModel.js';

export const registerBatch = async (req, res) => {
  try {

    const { accounts } = req.body;
    console.log('Accounts', accounts);
    
    if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
      return res.status(400).json({ error: "Invalid accounts data" });
    }
    
    const results = {
      success: [],
      errors: []
    };
    
    // Process each account
    for (const account of accounts) {
      try {
        const { userID, accountName, username, password, position } = account;
        
        // Check if user already exists
        const existingUser = await userModel.findUserByUsername(username);
        if (existingUser) {
          results.errors.push({ 
            username, 
            error: "Username already exists" 
          });
          continue;
        }
        
        // Hash the password
        const hash = await bcrypt.hash(password, 10);
        
        // Save user to database (assuming you'll update your model to include name and position)
        await userModel.createUser(userID, accountName, username, hash, position);
        
        results.success.push(username);
      } catch (err) {
        console.error(`Error processing account ${account.username}:`, err);
        results.errors.push({ 
          username: account.username, 
          error: err.message 
        });
      }
    }
    
    // Return appropriate response
    if (results.errors.length === 0) {
      return res.status(201).json({ 
        message: `Successfully registered ${results.success.length} accounts`,
        accounts: results.success
      });
    } else if (results.success.length === 0) {
      return res.status(400).json({ 
        error: "Failed to register any accounts", 
        details: results.errors 
      });
    } else {
      return res.status(207).json({
        message: `Registered ${results.success.length} accounts with ${results.errors.length} failures`,
        success: results.success,
        errors: results.errors
      });
    }
  } catch (err) {
    console.error("Error in batch registration:", err);
    res.status(500).json({ error: "Error processing batch registration", details: err.message });
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user in database
    const user = await userModel.findUserByUsername(username);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    
    // Generate token
    const token = jwt.sign({ id: user.id }, "secretKey", { expiresIn: "1h" });
    
    res.json ({ 
      message: "Login successful", 
      token,
      userID: user.userID,
      username: user.username,
      accountName: user.accountName,
      position: user.position
    });
    console.log(user);
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Error during login", details: err.message });
  }
}; 

export const manageAccounts = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM users ORDER BY userID ASC
    `);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching accounts data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching accounts data', 
      error: error.message 
    });
  }
}

export const deleteAccount = async (req, res) => {
  const connection = await pool.getConnection();
  const userID = req.params.userID;

  try {

    await connection.query('DELETE FROM users WHERE userID = ?', [userID]);
  
    res.status(200).json({ 
      success: true, 
      message: 'Account deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting Account:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting Account', 
      error: error.message 
    });
  } finally {
    connection.release();
  }
};

export const getLastSequence = async (req, res) => {
  try {
    const { dateFormat } = req.query;
    
    if (!dateFormat) {
      return res.status(400).json({ error: 'dateFormat is required' });
    }
    
    // Get the last sequence number from userID for the specified date format
    const [userIDRows] = await pool.query(
      `SELECT MAX(CAST(SUBSTRING(userID, LENGTH('USER') + LENGTH(?) + 1) AS UNSIGNED)) AS lastUserIDSequence 
       FROM users 
       WHERE userID LIKE CONCAT('USER', ?, '%')`,
      [dateFormat, dateFormat]
    );
    
    // Get the maximum sequence number from all usernames with this date format
    const [usernameRows] = await pool.query(
      `SELECT MAX(CAST(SUBSTRING(username, LOCATE(?, username) + LENGTH(?)) AS UNSIGNED)) AS lastUsernameSequence 
       FROM users 
       WHERE username LIKE CONCAT('%', ?, '%')`,
      [dateFormat, dateFormat, dateFormat]
    );
    
    const lastUserIDSequence = userIDRows[0].lastUserIDSequence || 0;
    const lastUsernameSequence = usernameRows[0].lastUsernameSequence || 0;
    
    // Return the maximum of both sequences to ensure no duplicates
    const lastSequence = Math.max(lastUserIDSequence, lastUsernameSequence);
    
    return res.status(200).json({ lastSequence });
  } catch (error) {
    console.error('Error getting last sequence:', error);
    return res.status(500).json({ error: 'Error getting last sequence', details: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userID } = req.params;
    const { accountName, username } = req.body;
    
    // Check if username is already taken by another user
    if (username) {
      const existingUser = await userModel.findUserByUsername(username);
      if (existingUser && existingUser.userID !== userID) {
        return res.status(400).json({
          error: "Username is already taken"
        });
      }
    }
    
    // Update user profile
    await userModel.updateUser(userID, {
      accountName,
      username
    });
    
    res.status(200).json({
      success: true,
      message: "Profile updated successfully"
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({
      error: "Error updating user profile",
      details: error.message
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userID } = req.params;
    const { oldPassword, newPassword } = req.body;
    
    // Find user
    const user = await userModel.findUserByID(userID);
    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }
    
    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Current password is incorrect"
      });
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    await userModel.updateUserPassword(userID, hashedPassword);
    
    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      error: "Error changing password",
      details: error.message
    });
  }
};
