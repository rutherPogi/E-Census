import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Hash the password
    const hash = await bcrypt.hash(password, 10);
    
    // Save user to database
    await userModel.createUser(username, hash);
    
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user", details: err.message });
  }
};

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
    
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Error during login", details: err.message });
  }
}; 