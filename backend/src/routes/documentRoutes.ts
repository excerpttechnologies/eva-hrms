// src/routes/documentRoutes.ts
import { Router } from 'express';
import { documentController } from '@controllers';
import { authenticate, authorize } from '@middleware/auth';
import { uploadMiddleware } from '@middleware/upload';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/upload', uploadMiddleware.single('file'), documentController.upload);
router.get('/', documentController.getAll);
router.get('/:id/download', documentController.download);
router.delete('/:id', authorize(['hr', 'admin']), documentController.delete);
router.post('/:id/request-signature', authorize(['hr', 'admin']), documentController.requestSignature);

export default router;
