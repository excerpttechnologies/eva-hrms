// src/routes/trainingRoutes.ts
import { Router } from 'express';
import { trainingController } from '@controllers';
import { authenticate, authorize } from '@middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', trainingController.getPrograms);
router.post('/', authorize(['hr', 'training']), trainingController.createProgram);
router.post('/:programId/enroll', authorize(['hr', 'training']), trainingController.enrollEmployee);
router.put('/:enrollmentId/complete', authenticate, trainingController.completeTraining);

export default router;
