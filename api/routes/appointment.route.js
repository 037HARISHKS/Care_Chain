import express from 'express';
import {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    approveAppointment,
    rejectAppointment,
    cancelAppointment,
    getDoctorSchedule,
    getPatientHistory
} from '../controllers/appointment.controller.js';
import { verifyToken, isDoctor, isPatient } from '../middleware/auth.js';

const router = express.Router();

// Public routes (if any)

// Protected routes

// Patient routes
router.post('/create', isPatient, createAppointment);
router.get('/patient/history', isPatient, getPatientHistory);
router.post('/cancel/:id', isPatient, cancelAppointment);

// Doctor routes
router.get('/doctor/schedule', isDoctor, getDoctorSchedule);
router.put('/approve/:id', isDoctor, approveAppointment);
router.put('/reject/:id', isDoctor, rejectAppointment);
router.get('/doctor/appointments', isDoctor, getAppointmentsByDoctor);

// Common routes (accessible by both doctor and patient)
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
