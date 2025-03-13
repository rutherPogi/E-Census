// middlewares/auth.js - Authentication middleware
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: "Access denied" });
  
  jwt.verify(token, process.env.JWT_SECRET || "secretKey", (err, user) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    
    req.user = user;
    next();
  });
};