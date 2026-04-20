// src/controllers/documentController.ts
import { Request, Response } from 'express';
import { documentService } from '@services/documentService';
import { asyncHandler, AppError } from '@middleware/errorHandler';
import { logger } from '@utils/logger';

export const documentController = {
  upload: asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      throw new AppError(400, 'No file uploaded');
    }

    const document = await documentService.uploadDocument({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      ...req.body,
    } as any);

    logger.info(`Document uploaded: ${document.id}`);

    res.status(201).json({
      success: true,
      data: document,
    });
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { employeeId, type, page = 1, pageSize = 10 } = req.query;

    const result = await documentService.getDocuments({
      employeeId: employeeId as string,
      type: type as string,
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  download: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const document = await documentService.getDocumentById(id);

    res.download(document.path, document.originalName);
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await documentService.deleteDocument(id);

    logger.info(`Document deleted: ${id}`);

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  requestSignature: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { signatories } = req.body;

    if (!signatories || !Array.isArray(signatories)) {
      throw new AppError(400, 'signatories array is required');
    }

    const request = await documentService.requestSignature(id, signatories);

    logger.info(`Signature requested for document: ${id}`);

    res.status(200).json({
      success: true,
      data: request,
    });
  }),
};
