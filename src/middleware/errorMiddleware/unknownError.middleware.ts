import { NextFunction, Request, Response } from 'express';
import { optionalConfig } from '../../config';
import { getLogger } from '../../common/logger';

const logger = getLogger(__filename);

const unknownErrorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const env = optionalConfig.NODE_ENV;
  logger.error(`${error.message}\n stack: ${error.stack}`);
  return res.formatResponse(
    `Something went wrong, please try again in a few minutes`,
    500,
    env === 'dev' && { stack: error.stack },
  );
};

export { unknownErrorMiddleware };
