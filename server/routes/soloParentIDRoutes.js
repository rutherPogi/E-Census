// routes/surveyRoutes.js - Survey routes
import express from 'express';
import * as soloParentIDControllers from '../controllers/soloParentIDControllers.js';
import { authenticateToken } from '../middlewares/auth.js';
import { uploadToMemory, processImageForDatabase } from '../middlewares/multer.js';

const router = express.Router();

router.get('/generate-soloParentID', authenticateToken, soloParentIDControllers.getNewSoloParentId);
router.post('/submit-soloParentID', 
  authenticateToken, 
  uploadToMemory.fields([
    { name: 'photoID', maxCount: 1 },
    { name: 'signature', maxCount: 1 }
  ]), 
  processImageForDatabase,  
  soloParentIDControllers.submitSoloParentID
);

router.get('/manage-soloParentID', authenticateToken, soloParentIDControllers.manageSoloParentId);

export default router; 