// src/controllers/employeeController.ts
import { Request, Response } from 'express';
import { employeeService } from '@services/employeeService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { validate, schemas } from '@utils/validators';
import { logger } from '@utils/logger';

export const employeeController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const data = validate(req.body, schemas.createEmployeeSchema);
    const employee = await employeeService.createEmployee(data as any);

    logger.info(`Employee created: ${employee.email}`);

    res.status(201).json({
      success: true,
      data: employee,
    });
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { department, status, page = 1, pageSize = 10 } = req.query;

    const result = await employeeService.getEmployees({
      department: department as string,
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
    const employee = await employeeService.getEmployeeById(id);

    res.status(200).json({
      success: true,
      data: employee,
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const employee = await employeeService.updateEmployee(id, req.body);

    logger.info(`Employee updated: ${id}`);

    res.status(200).json({
      success: true,
      data: employee,
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await employeeService.deleteEmployee(id);

    logger.info(`Employee deleted: ${id}`);

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  getStats: asyncHandler(async (req: Request, res: Response) => {
    const stats = await employeeService.getEmployeeStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  }),
};
