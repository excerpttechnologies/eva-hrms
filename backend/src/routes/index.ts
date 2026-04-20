// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './authRoutes';
import employeeRoutes from './employeeRoutes';
import recruitmentRoutes from './recruitmentRoutes';
import payrollRoutes from './payrollRoutes';
import attendanceRoutes from './attendanceRoutes';
import leaveRoutes from './leaveRoutes';
import projectRoutes from './projectRoutes';
import expenseRoutes from './expenseRoutes';
import performanceRoutes from './performanceRoutes';
import trainingRoutes from './trainingRoutes';
import complianceRoutes from './complianceRoutes';
import documentRoutes from './documentRoutes';

const router = Router();

// API v1 routes
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/employees', employeeRoutes);
router.use('/api/v1/recruitment', recruitmentRoutes);
router.use('/api/v1/payroll', payrollRoutes);
router.use('/api/v1/attendance', attendanceRoutes);
router.use('/api/v1/leave', leaveRoutes);
router.use('/api/v1/projects', projectRoutes);
router.use('/api/v1/expenses', expenseRoutes);
router.use('/api/v1/performance', performanceRoutes);
router.use('/api/v1/training', trainingRoutes);
router.use('/api/v1/compliance', complianceRoutes);
router.use('/api/v1/documents', documentRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router;
