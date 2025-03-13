// routes/surveyRoutes.js - Survey routes
import express from 'express';
import * as seniorCitizenIDControllers from '../controllers/seniorCitizenIDControllers.js';
import { authenticateToken } from '../middlewares/auth.js';
import { upload, processPhotoSignature, handleBase64Image } from '../middlewares/multer.js';

const router = express.Router();

router.get('/generate-seniorCitizenID', authenticateToken, seniorCitizenIDControllers.getNewSeniorCitizenId);
router.post('/submit-seniorCitizenID', 
  upload.fields([
    { name: 'photoID', maxCount: 1 },
    { name: 'signature', maxCount: 1 }
  ]),
  processPhotoSignature,         
  handleBase64Image,      
  authenticateToken,
  seniorCitizenIDControllers.submitSeniorCitizenID
);

export default router; 