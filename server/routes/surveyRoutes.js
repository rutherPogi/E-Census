// routes/surveyRoutes.js - Survey routes
import express from 'express';
import * as surveyController from '../controllers/surveyController.js';
import { authenticateToken } from '../middlewares/auth.js';
import { uploadToMemory, processImageForDatabase } from '../middlewares/multer.js';

const router = express.Router();

router.post('/submit-survey', 
  authenticateToken, 
  uploadToMemory.array('houseImages', 10),
  processImageForDatabase,
  surveyController.submitSurvey);
router.put('/update-survey', 
  authenticateToken, 
  uploadToMemory.array('houseImages', 10),
  processImageForDatabase,
  surveyController.updateSurvey);

router.get('/manage-survey', authenticateToken, surveyController.manageSurvey);
router.get('/view-survey/:surveyID', authenticateToken, surveyController.viewSurvey);

router.delete('/delete-survey/:surveyID/:populationID', authenticateToken, surveyController.deleteSurvey);
router.get('/generate-surveyID', authenticateToken, surveyController.getNewSurveyId);

export default router; 