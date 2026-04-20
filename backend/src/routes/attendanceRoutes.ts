// src/routes/attendanceRoutes.ts
import { Router } from 'express';
import { attendanceController } from '@controllers';
import { authenticate } from '@middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/check-in', attendanceController.checkIn);
router.post('/check-out', attendanceController.checkOut);
router.get('/stats', attendanceController.getStats);
router.get('/', attendanceController.getAttendance);

export default router;
