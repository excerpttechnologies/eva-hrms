// src/routes/complianceRoutes.ts
import { Router } from 'express';
import { complianceController } from '@controllers';
import { authenticate, authorize } from '@middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/policies', complianceController.getPolicies);
router.post('/policies', authorize(['compliance', 'admin']), complianceController.createPolicy);
router.post('/policies/:policyId/acknowledge', authenticate, complianceController.acknowledgePolicy);
router.get('/policies/:policyId/status', authorize(['hr', 'compliance']), complianceController.getAcknowledgmentStatus);
router.post('/audits', authorize(['compliance', 'admin']), complianceController.createAudit);

export default router;
