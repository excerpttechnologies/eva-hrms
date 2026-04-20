// src/routes/authRoutes.ts
import { Router } from 'express';
import { authController } from '@controllers';
import { authenticate } from '@middleware/auth';

const router = Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.post('/change-password/:userId', authenticate, authController.changePassword);

export default router;
