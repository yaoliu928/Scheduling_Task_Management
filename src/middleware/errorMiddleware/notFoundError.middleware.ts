import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../../common/exceptions/notFound.exception';

const notFoundErrorMiddleware = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof NotFoundException) {
    return res.formatResponse(error.message, 404);
  }
  next(error);
};

export { notFoundErrorMiddleware };
