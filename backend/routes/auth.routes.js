import express from 'express';
import { login, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * Authentication Routes
 * Handles all authentication-related endpoints
 */

// Public routes
router.post('/login', login);

// Protected routes (require authentication)
router.get('/me', protect, getMe);

export default router;
