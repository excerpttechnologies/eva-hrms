// src/controllers/trainingController.ts
import { Request, Response } from 'express';
import { trainingService } from '@services/trainingService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { logger } from '@utils/logger';

export const trainingController = {
  createProgram: asyncHandler(async (req: Request, res: Response) => {
    const program = await trainingService.createProgram(req.body as any);

    logger.info(`Training program created: ${program.id}`);

    res.status(201).json({
      success: true,
      data: program,
    });
  }),

  getPrograms: asyncHandler(async (req: Request, res: Response) => {
    const { type, page = 1, pageSize = 10 } = req.query;

    const result = await trainingService.getPrograms({
      type: type as string,
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  enrollEmployee: asyncHandler(async (req: Request, res: Response) => {
    const { programId } = req.params;
    const { employeeIds } = req.body;

    if (!employeeIds || !Array.isArray(employeeIds)) {
      throw new AppError(400, 'employeeIds array is required');
    }

    const result = await trainingService.enrollEmployees(programId, employeeIds);

    logger.info(`Employees enrolled in program: ${programId}`);

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  completeTraining: asyncHandler(async (req: Request, res: Response) => {
    const { enrollmentId } = req.params;
    const { score, certificateUrl } = req.body;

    const enrollment = await trainingService.completeTraining(enrollmentId, score, certificateUrl);

    logger.info(`Training completed: ${enrollmentId}`);

    res.status(200).json({
      success: true,
      data: enrollment,
    });
  }),
};
