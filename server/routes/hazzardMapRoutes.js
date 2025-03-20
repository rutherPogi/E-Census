import express from 'express';
import * as hazzardMapController from '../controllers/hazzardMapControllers.js';
import { authenticateToken } from '../middlewares/auth.js';
import { uploadToMemory, processImageForDatabase } from '../middlewares/multer.js';

const router = express.Router();

router.get('/coordinates', authenticateToken, hazzardMapController.getCoordinates);



export default router; 