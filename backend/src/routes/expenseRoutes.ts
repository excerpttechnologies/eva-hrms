// src/routes/expenseRoutes.ts
import { Router } from 'express';
import { expenseController } from '@controllers';
import { authenticate, authorize } from '@middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/', expenseController.submit);
router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getById);
router.put('/:id/approve', authorize(['finance', 'manager']), expenseController.approve);
router.put('/:id/reject', authorize(['finance', 'manager']), expenseController.reject);

export default router;
