// src/controllers/attendanceController.ts
import { Request, Response } from 'express';
import { attendanceService } from '@services/attendanceService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { logger } from '@utils/logger';

export const attendanceController = {
  checkIn: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId, latitude, longitude } = req.body;

    if (!employeeId) {
      throw new AppError(400, 'employeeId is required');
    }

    const record = await attendanceService.checkIn(employeeId, latitude, longitude);

    logger.info(`Check-in: ${employeeId}`);

    res.status(200).json({
      success: true,
      data: record,
    });
  }),

  checkOut: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId } = req.body;

    if (!employeeId) {
      throw new AppError(400, 'employeeId is required');
    }

    const record = await attendanceService.checkOut(employeeId);

    logger.info(`Check-out: ${employeeId}`);

    res.status(200).json({
      success: true,
      data: record,
    });
  }),

  getAttendance: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId, startDate, endDate } = req.query;

    const result = await attendanceService.getAttendanceRecords({
      employeeId: employeeId as string,
      startDate: startDate as string,
      endDate: endDate as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  getStats: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId } = req.query;

    const stats = await attendanceService.getAttendanceStats(employeeId as string);

    res.status(200).json({
      success: true,
      data: stats,
    });
  }),
};
