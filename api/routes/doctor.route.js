import express from 'express';
const router = express.Router();
import { getDoctors } from '../controllers/doctor.controller.js';


router.get('/',getDoctors);
export default router;

