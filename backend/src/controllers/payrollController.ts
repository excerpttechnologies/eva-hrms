// src/controllers/payrollController.ts
import { Request, Response } from 'express';
import { payrollService } from '@services/payrollService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { logger } from '@utils/logger';

export const payrollController = {
  calculate: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId, month, year } = req.body;

    if (!employeeId || !month || !year) {
      throw new AppError(400, 'employeeId, month, and year are required');
    }

    const calculation = await payrollService.calculatePayroll(employeeId, month, year);

    res.status(200).json({
      success: true,
      data: calculation,
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const record = await payrollService.createPayrollRecord(req.body as any);

    logger.info(`Payroll record created: ${record.id}`);

    res.status(201).json({
      success: true,
      data: record,
    });
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId, status, page = 1, pageSize = 10 } = req.query;

    const result = await payrollService.getPayrollRecords({
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
    const record = await payrollService.approvePayroll(id);

    logger.info(`Payroll approved: ${id}`);

    res.status(200).json({
      success: true,
      data: record,
    });
  }),
};
