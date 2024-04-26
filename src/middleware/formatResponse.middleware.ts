import { Request, Response } from 'express';

const formatResponse = (_req: Request, res: Response, next: () => void) => {
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

export { formatResponse };
