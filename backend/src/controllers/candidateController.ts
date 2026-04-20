// src/controllers/candidateController.ts
import { Request, Response } from 'express';
import { candidateService } from '@services/candidateService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { logger } from '@utils/logger';

export const candidateController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const candidate = await candidateService.createCandidate(req.body as any);

    logger.info(`Candidate created: ${candidate.email}`);

    res.status(201).json({
      success: true,
      data: candidate,
    });
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { jobId, stage, page = 1, pageSize = 10 } = req.query;

    const result = await candidateService.getCandidates({
      jobId: jobId as string,
      stage: stage as string,
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const candidate = await candidateService.getCandidateById(id);

    res.status(200).json({
      success: true,
      data: candidate,
    });
  }),

  updateStage: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { stage } = req.body;

    if (!stage) {
      throw new AppError(400, 'Stage is required');
    }

    const candidate = await candidateService.updateCandidateStage(id, stage);

    logger.info(`Candidate stage updated: ${id} -> ${stage}`);

    res.status(200).json({
      success: true,
      data: candidate,
    });
  }),

  getStats: asyncHandler(async (req: Request, res: Response) => {
    const stats = await candidateService.getRecruitmentStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  }),
};
