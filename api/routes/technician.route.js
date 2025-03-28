import express from 'express'
import { fetchScanReports, techReportCreationByDoctor } from '../controllers/technician.controller.js';

const router = express.Router();

router.post('/create',techReportCreationByDoctor);
router.get('/fetchScanRequests',fetchScanReports);

export default router;