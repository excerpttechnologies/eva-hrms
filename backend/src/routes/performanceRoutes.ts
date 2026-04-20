// src/routes/performanceRoutes.ts
import { Router } from 'express';
import { performanceController } from '@controllers';
import { authenticate, authorize } from '@middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/goals', performanceController.getGoals);
router.post('/goals', authorize(['manager', 'hr']), performanceController.setGoals);
router.get('/', performanceController.getReviews);
router.post('/', authorize(['manager', 'hr']), performanceController.createReview);
router.put('/:id/submit', authenticate, performanceController.submitReview);

export default router;
