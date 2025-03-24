import express from 'express';
import { createReport, getReportsByPatient, getReportById } from '../controllers/report.controller.js';
import upload from '../utils/fileUpload.js'; // Corrected path for file upload utility
import { authenticateToken } from '../middleware/auth.middleware.js'; // Corrected path for auth middleware

const router = express.Router();

// Route to create a report
router.post('/', authenticateToken, upload.single('reportFile'), createReport);

// Route to get reports by patient ID
router.get('/patient/:patientId', authenticateToken, getReportsByPatient);

// Route to get report details by ID
router.get('/:id', authenticateToken, getReportById);

export default router; 