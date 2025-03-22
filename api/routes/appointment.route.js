import express from 'express';
import {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDoctor,
    approveAppointment,
    rejectAppointment,
    cancelAppointment,
    getDoctorSchedule,
    getPatientHistory,
    getUpcomingAppointments,
    getDoctorAppointments,
    getUpcomingAppointmentsDoctor,
    getDoctorAppointmentsHistory
} from '../controllers/appointment.controller.js';

const router = express.Router();

// Public routes (if any)

// Protected routes

// Patient routes
router.post('/create', createAppointment);
router.get('/patient/history/:id', getPatientHistory);
router.get('/patient/upcoming/:id', getUpcomingAppointments);
router.post('/cancel/:id', cancelAppointment);

// Doctor routes
router.get('/doctor/schedule', getDoctorSchedule);
router.get('/doctor/upcoming/:id', getUpcomingAppointmentsDoctor);
router.get('/doctor/history/:id', getDoctorAppointmentsHistory);
router.put('/approve/:id', approveAppointment);
router.put('/reject/:id', rejectAppointment);
router.get('/doctor/appointments', getAppointmentsByDoctor);

// Common routes (accessible by both doctor and patient)
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.get('/doctorAppointments/:id', getDoctorAppointments);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
