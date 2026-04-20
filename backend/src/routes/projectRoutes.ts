// src/routes/projectRoutes.ts
import { Router } from 'express';
import { projectController } from '@controllers';
import { authenticate, authorize } from '@middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', projectController.getAll);
router.post('/', authorize(['manager', 'admin']), projectController.create);
router.get('/:id', projectController.getById);
router.put('/:id', authorize(['manager', 'admin']), projectController.update);
router.put('/:id/status', authorize(['manager', 'admin']), projectController.updateStatus);
router.post('/:id/team', authorize(['manager', 'admin']), projectController.assignTeam);

export default router;
