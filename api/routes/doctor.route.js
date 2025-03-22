import express from 'express';
const router = express.Router();
import { getDoctors, updateDoctor } from '../controllers/doctor.controller.js';

router.get('/', getDoctors);
router.put('/update/:id', updateDoctor);

export default router;

