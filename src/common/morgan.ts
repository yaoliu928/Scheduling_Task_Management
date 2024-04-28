import morgan from 'morgan';
import { optionalConfig } from '../config';
import { getLogger } from './logger';

const env = optionalConfig.NODE_ENV;
const logger = getLogger();

const morganLog = morgan(env === 'dev' ? 'dev' : 'combined', {
  stream: {
    write: (message) => {
      logger.info(message);
    },
  },
});

export { morganLog };
