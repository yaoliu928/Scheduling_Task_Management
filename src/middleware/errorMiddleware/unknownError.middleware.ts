// const config = require('../../config');
// const getLogger = require('../../common/logger');

// const logger = getLogger(__filename);
import { Request, Response } from 'express';

const unknownErrorMiddleware = (_error: Error, _req: Request, res: Response) => {
  // logger.error(`${error.message}\n stack: ${error.stack}`);
  res.formatResponse(
    `Something went wrong, please try again in a few minutes`,
    500,
    // config.NODE_ENV === 'dev' && { stack: error.stack }
  );
};

export { unknownErrorMiddleware };
