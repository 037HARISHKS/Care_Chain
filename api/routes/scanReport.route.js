import express from 'express';
import { createScanReport, getScanReports } from '../controllers/scanReport.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Route to create a scan report
router.post('/', createScanReport);

// Route to get all scan reports
router.get('/', authenticateToken, getScanReports);

export default router; 