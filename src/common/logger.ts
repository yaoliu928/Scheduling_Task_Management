import winston, { Logger } from 'winston';
import path from 'path';

const getLogger = (filename?: string): Logger => {
  const logger = winston.createLogger({
    level: 'info',
    defaultMeta: {
      file: filename ? path.basename(filename) : undefined,
    },
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(
        ({ timestamp, level, message, file }) => `[${timestamp}] [${level}] ${file ? `[${file}]` : ''}: ${message}`,
      ),
    ),
    transports: [new winston.transports.Console()],
  });

  return logger;
};

export { getLogger };
