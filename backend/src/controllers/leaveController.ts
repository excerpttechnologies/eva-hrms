// src/controllers/leaveController.ts
import { Request, Response } from 'express';
import { leaveService } from '@services/leaveService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { logger } from '@utils/logger';

export const leaveController = {
  requestLeave: asyncHandler(async (req: Request, res: Response) => {
    const request = await leaveService.createLeaveRequest(req.body as any);

    logger.info(`Leave request created: ${request.id}`);

    res.status(201).json({
      success: true,
      data: request,
    });
  }),

  getRequests: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId, status, page = 1, pageSize = 10 } = req.query;

    const result = await leaveService.getLeaveRequests({
      employeeId: employeeId as string,
      status: status as string,
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  approve: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { approverComments } = req.body;

    const request = await leaveService.approveLeaveRequest(id, approverComments);

    logger.info(`Leave request approved: ${id}`);

    res.status(200).json({
      success: true,
      data: request,
    });
  }),

  reject: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    const request = await leaveService.rejectLeaveRequest(id, rejectionReason);

    logger.info(`Leave request rejected: ${id}`);

    res.status(200).json({
      success: true,
      data: request,
    });
  }),

  getBalance: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId } = req.query;

    if (!employeeId) {
      throw new AppError(400, 'employeeId is required');
    }

    const balance = await leaveService.getLeaveBalance(employeeId as string);

    res.status(200).json({
      success: true,
      data: balance,
    });
  }),
};
