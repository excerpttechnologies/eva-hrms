// src/routes/employeeRoutes.ts
import { Router } from 'express';
import { employeeController } from '@controllers';
import { authenticate, authorize } from '@middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/stats', authorize(['hr', 'admin']), employeeController.getStats);
router.get('/', employeeController.getAll);
router.post('/', authorize(['hr', 'admin']), employeeController.create);
router.get('/:id', employeeController.getById);
router.put('/:id', authorize(['hr', 'admin']), employeeController.update);
router.delete('/:id', authorize(['admin']), employeeController.delete);

export default router;
