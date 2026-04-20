// src/controllers/projectController.ts
import { Request, Response } from 'express';
import { projectService } from '@services/projectService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { logger } from '@utils/logger';

export const projectController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const project = await projectService.createProject(req.body as any);

    logger.info(`Project created: ${project.id}`);

    res.status(201).json({
      success: true,
      data: project,
    });
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { status, page = 1, pageSize = 10 } = req.query;

    const result = await projectService.getProjects({
      status: status as string,
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
    const project = await projectService.getProjectById(id);

    res.status(200).json({
      success: true,
      data: project,
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await projectService.updateProject(id, req.body);

    logger.info(`Project updated: ${id}`);

    res.status(200).json({
      success: true,
      data: project,
    });
  }),

  assignTeam: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { employeeIds } = req.body;

    if (!employeeIds || !Array.isArray(employeeIds)) {
      throw new AppError(400, 'employeeIds array is required');
    }

    const project = await projectService.assignTeam(id, employeeIds);

    logger.info(`Team assigned to project: ${id}`);

    res.status(200).json({
      success: true,
      data: project,
    });
  }),

  updateStatus: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      throw new AppError(400, 'status is required');
    }

    const project = await projectService.updateProjectStatus(id, status);

    logger.info(`Project status updated: ${id} -> ${status}`);

    res.status(200).json({
      success: true,
      data: project,
    });
  }),
};
