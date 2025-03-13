// routes/surveyRoutes.js - Survey routes
import express from 'express';
import * as soloParentIDControllers from '../controllers/soloParentIDControllers.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/generate-soloParentID', authenticateToken, soloParentIDControllers.getNewSoloParentId);
router.post('/submit-soloParentID', authenticateToken, soloParentIDControllers.submitSoloParentID);

export default router; 