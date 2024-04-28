import { Request, Response, NextFunction } from 'express';

const formatResponseMiddleware = (_req: Request, res: Response, next: NextFunction) => {
  res.formatResponse = (data: unknown, statusCode = 200, customObject = {}) => {
    const dataKey = statusCode < 400 ? 'data' : 'error';

    const responseData = {
      status: statusCode,
      [dataKey]: data,
      ...customObject,
    };

    return res.status(statusCode).json(responseData);
  };
  next();
};

export { formatResponseMiddleware };
