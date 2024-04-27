import { Request, Response } from 'express';
import { getLogger } from '../common/logger';

const logger = getLogger(__filename);

const pathNotFoundMiddleware = (req: Request, res: Response) => {
  logger.warn(`Requested url is not found: ${req.originalUrl}`);
  res.formatResponse(`Requested url is not found: ${req.originalUrl}`, 404);
};

export { pathNotFoundMiddleware };
