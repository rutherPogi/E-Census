// models/userModel.js - User-related database operations
import pool from '../config/database.js';

export const findUserByUsername = async (username) => {
  const [rows] = await pool.query("SELECT * FROM sample WHERE username = ?", [username]);
  return rows[0];
};

export const createUser = async (username, hashedPassword) => {
  const [result] = await pool.query(
    "INSERT INTO sample (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  return result;
};