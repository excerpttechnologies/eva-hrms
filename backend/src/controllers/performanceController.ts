// src/controllers/performanceController.ts
import { Request, Response } from 'express';
import { performanceService } from '@services/performanceService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { logger } from '@utils/logger';

export const performanceController = {
  createReview: asyncHandler(async (req: Request, res: Response) => {
    const review = await performanceService.createReview(req.body as any);

    logger.info(`Performance review created: ${review.id}`);

    res.status(201).json({
      success: true,
      data: review,
    });
  }),

  getReviews: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId, period, page = 1, pageSize = 10 } = req.query;

    const result = await performanceService.getReviews({
      employeeId: employeeId as string,
      period: period as string,
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  submitReview: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const review = await performanceService.submitReview(id, req.body);

    logger.info(`Review submitted: ${id}`);

    res.status(200).json({
      success: true,
      data: review,
    });
  }),

  getGoals: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId } = req.query;

    if (!employeeId) {
      throw new AppError(400, 'employeeId is required');
    }

    const goals = await performanceService.getGoals(employeeId as string);

    res.status(200).json({
      success: true,
      data: goals,
    });
  }),

  setGoals: asyncHandler(async (req: Request, res: Response) => {
    const result = await performanceService.setGoals(req.body as any);

    logger.info(`Goals set for employee`);

    res.status(201).json({
      success: true,
      data: result,
    });
  }),
};
