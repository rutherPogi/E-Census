import express from 'express';
import * as pwdIDControllers from '../controllers/pwdIDControllers.js';
import { authenticateToken } from '../middlewares/auth.js';
import { upload, processPhotoID, handleBase64Image } from '../middlewares/multer.js';

const router = express.Router();

router.get('/generate-pwdID', authenticateToken, pwdIDControllers.getNewPwdId);
router.post('/submit-pwdID', 
  upload.single('photoID'), 
  processPhotoID,         
  handleBase64Image,      
  authenticateToken,
  pwdIDControllers.submitPwdId
);


export default router; 