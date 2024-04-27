import { Request, Response, NextFunction } from 'express';

const validationErrorMiddleware = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'ValidationError') {
    return res.formatResponse(error.message.replace(/"/g, ''), 400);
  }
  next(error);
};

export { validationErrorMiddleware };
