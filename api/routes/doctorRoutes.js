import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes - only authenticated doctors can access
router.use(authenticateToken);
router.use(authorizeRoles('doctor'));

// Example protected routes
router.get('/appointments', /* your controller */);
router.post('/availability', /* your controller */);
router.put('/profile', /* your controller */);

export default router; 