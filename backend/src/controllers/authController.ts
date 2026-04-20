// src/controllers/authController.ts
import { Request, Response } from 'express';
import { authService } from '@services/authService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { validate, schemas } from '@utils/validators';
import { logger } from '@utils/logger';

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const data = validate(req.body, schemas.registerSchema);
    const result = await authService.register(data);

    logger.info(`User registered: ${result.user.email}`);

    res.status(201).json({
      success: true,
      data: result,
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = validate(req.body, schemas.loginSchema);
    const result = await authService.login(email, password);

    logger.info(`User logged in: ${email}`);

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  changePassword: asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new AppError(400, 'Old and new passwords are required');
    }

    const result = await authService.changePassword(userId, oldPassword, newPassword);

    logger.info(`Password changed for user: ${userId}`);

    res.status(200).json({
      success: true,
      data: result,
    });
  }),
};
