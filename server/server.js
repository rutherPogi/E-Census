// server.js - Main entry point
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js';
import pwdIDRoutes from './routes/pwdIDRoutes.js';
import soloParentIDRoutes from './routes/soloParentIDRoutes.js';
import seniorCitizenIDRoutes from './routes/seniorCitizenIDRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/pwdID', pwdIDRoutes);
app.use('/api/soloParentID', soloParentIDRoutes);
app.use('/api/seniorCitizenID', seniorCitizenIDRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});