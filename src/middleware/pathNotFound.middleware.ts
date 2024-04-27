import { Request, Response } from 'express';

const pathNotFoundMiddleware = (req: Request, res: Response) => {
  res.formatResponse(`Requested url is not found: ${req.originalUrl}`, 404);
};

export { pathNotFoundMiddleware };
