// routes/surveyRoutes.js - Survey routes
import express from 'express';
import * as surveyController from '../controllers/surveyController.js';
import { authenticateToken } from '../middlewares/auth.js';
import { uploadToMemory, processImageForDatabase } from '../middlewares/multer.js';

const router = express.Router();

router.post('/submit-survey', 
  authenticateToken, 
  uploadToMemory.single('houseImage'),  // Use memory storage for database
  processImageForDatabase,
  surveyController.submitSurvey);
router.get('/manage-survey', authenticateToken, surveyController.manageSurvey);
router.get('/view-survey/:surveyID', authenticateToken, surveyController.viewSurvey);
router.delete('/delete-survey/:surveyID', authenticateToken, surveyController.deleteSurvey);
router.get('/generate-surveyID', authenticateToken, surveyController.getNewSurveyId);

export default router; 