// src/routes/recruitmentRoutes.ts
import { Router } from 'express';
import { candidateController } from '@controllers';
import { authenticate, authorize } from '@middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/stats', authorize(['hr', 'recruitment']), candidateController.getStats);
router.get('/', candidateController.getAll);
router.post('/', authorize(['hr', 'recruitment']), candidateController.create);
router.get('/:id', candidateController.getById);
router.put('/:id/stage', authorize(['hr', 'recruitment']), candidateController.updateStage);

export default router;
