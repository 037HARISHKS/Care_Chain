import express from 'express';
import {getPatientByApplicationId, getPatients} from '../controllers/patient.controller.js';

const router = express.Router();

router.get('/', getPatients);

router.get('/application/:id', getPatientByApplicationId);

export default router;
