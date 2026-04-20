// src/routes/leaveRoutes.ts
import { Router } from 'express';
import { leaveController } from '@controllers';
import { authenticate, authorize } from '@middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/', leaveController.requestLeave);
router.get('/', leaveController.getRequests);
router.get('/balance', leaveController.getBalance);
router.put('/:id/approve', authorize(['hr', 'manager']), leaveController.approve);
router.put('/:id/reject', authorize(['hr', 'manager']), leaveController.reject);

export default router;
