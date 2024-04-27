import { Request, Response, NextFunction } from 'express';
import { TimeExcessException } from '../../common/exceptions/timeExcess.exception';

const TimeExcessErrorMiddleware = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof TimeExcessException) {
    return res.formatResponse(error.message, 400);
  }
  next(error);
};

export { TimeExcessErrorMiddleware };
