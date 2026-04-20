// src/routes/payrollRoutes.ts
import { Router } from 'express';
import { payrollController } from '@controllers';
import { authenticate, authorize } from '@middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/calculate', authorize(['payroll', 'finance']), payrollController.calculate);
router.get('/', authorize(['payroll', 'finance', 'hr']), payrollController.getAll);
router.post('/', authorize(['payroll', 'finance']), payrollController.create);
router.put('/:id/approve', authorize(['payroll', 'finance']), payrollController.approve);

export default router;
