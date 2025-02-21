import express from 'express';
import { patientRegister, doctorRegister, adminRegister, patientLogin, doctorLogin, adminLogin, showUsers } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/users', showUsers);
router.post('/patient/register', patientRegister);
router.post('/doctor/register', doctorRegister);
router.post('/admin/register', adminRegister);
router.post('/patient/login', patientLogin);
router.post('/doctor/login', doctorLogin);
router.post('/admin/login', adminLogin);

export default router;
