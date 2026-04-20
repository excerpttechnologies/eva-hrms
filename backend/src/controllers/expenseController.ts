// src/controllers/expenseController.ts
import { Request, Response } from 'express';
import { expenseService } from '@services/expenseService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { logger } from '@utils/logger';

export const expenseController = {
  submit: asyncHandler(async (req: Request, res: Response) => {
    const expense = await expenseService.createExpense(req.body as any);

    logger.info(`Expense submitted: ${expense.id}`);

    res.status(201).json({
      success: true,
      data: expense,
    });
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId, status, page = 1, pageSize = 10 } = req.query;

    const result = await expenseService.getExpenses({
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

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const expense = await expenseService.getExpenseById(id);

    res.status(200).json({
      success: true,
      data: expense,
    });
  }),

  approve: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { comments } = req.body;

    const expense = await expenseService.approveExpense(id, comments);

    logger.info(`Expense approved: ${id}`);

    res.status(200).json({
      success: true,
      data: expense,
    });
  }),

  reject: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      throw new AppError(400, 'Rejection reason is required');
    }

    const expense = await expenseService.rejectExpense(id, reason);

    logger.info(`Expense rejected: ${id}`);

    res.status(200).json({
      success: true,
      data: expense,
    });
  }),
};
