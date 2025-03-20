// routes/surveyRoutes.js - Survey routes
import express from 'express';
import * as seniorCitizenIDControllers from '../controllers/seniorCitizenIDControllers.js';
import { authenticateToken } from '../middlewares/auth.js';
import { uploadToMemory, processImageForDatabase } from '../middlewares/multer.js';

const router = express.Router();

router.get('/generate-seniorCitizenID', authenticateToken, seniorCitizenIDControllers.getNewSeniorCitizenId);
router.post('/submit-seniorCitizenID',     
  authenticateToken,
  uploadToMemory.fields([
    { name: 'photoID', maxCount: 1 },
    { name: 'signature', maxCount: 1 }
  ]), 
  processImageForDatabase, 
  seniorCitizenIDControllers.submitSeniorCitizenID
);
router.get('/manage-seniorCitizenID', authenticateToken, seniorCitizenIDControllers.manageSeniorCitizenId);

export default router; 