// src/controllers/complianceController.ts
import { Request, Response } from 'express';
import { complianceService } from '@services/complianceService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { logger } from '@utils/logger';

export const complianceController = {
  createPolicy: asyncHandler(async (req: Request, res: Response) => {
    const policy = await complianceService.createPolicy(req.body as any);

    logger.info(`Compliance policy created: ${policy.id}`);

    res.status(201).json({
      success: true,
      data: policy,
    });
  }),

  getPolicies: asyncHandler(async (req: Request, res: Response) => {
    const { category, page = 1, pageSize = 10 } = req.query;

    const result = await complianceService.getPolicies({
      category: category as string,
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  acknowledgePolicy: asyncHandler(async (req: Request, res: Response) => {
    const { policyId } = req.params;
    const { employeeId } = req.body;

    if (!employeeId) {
      throw new AppError(400, 'employeeId is required');
    }

    const acknowledgment = await complianceService.acknowledgePolicy(employeeId, policyId);

    logger.info(`Policy acknowledged: ${policyId} by ${employeeId}`);

    res.status(200).json({
      success: true,
      data: acknowledgment,
    });
  }),

  getAcknowledgmentStatus: asyncHandler(async (req: Request, res: Response) => {
    const { policyId } = req.query;

    if (!policyId) {
      throw new AppError(400, 'policyId is required');
    }

    const status = await complianceService.getAcknowledgmentStatus(policyId as string);

    res.status(200).json({
      success: true,
      data: status,
    });
  }),

  createAudit: asyncHandler(async (req: Request, res: Response) => {
    const audit = await complianceService.createAudit(req.body as any);

    logger.info(`Audit created: ${audit.id}`);

    res.status(201).json({
      success: true,
      data: audit,
    });
  }),
};
