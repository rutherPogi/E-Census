import express from 'express';
import * as pwdIDControllers from '../controllers/pwdIDControllers.js';
import { authenticateToken } from '../middlewares/auth.js';
import { uploadToMemory, processImageForDatabase } from '../middlewares/multer.js';

const router = express.Router();

router.get('/generate-pwdID', authenticateToken, pwdIDControllers.getNewPwdId);
router.post('/submit-pwdID', 
  authenticateToken,
  uploadToMemory.fields([
    { name: 'photoID', maxCount: 1 },
    { name: 'signature', maxCount: 1 }
  ]), 
  processImageForDatabase,  
  pwdIDControllers.submitPwdId
);
router.get('/manage-pwdID', authenticateToken, pwdIDControllers.managePwdId);


export default router; 