import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { v1Router } from './routes';
import { formatResponseMiddleware } from './middleware/formatResponse.middleware';
import { pathNotFoundMiddleware } from './middleware/pathNotFound.middleware';
import { validationErrorMiddleware } from './middleware/errorMiddleware/validationError.middleware';
import { unknownErrorMiddleware } from './middleware/errorMiddleware/unknownError.middleware';
import { notFoundErrorMiddleware } from './middleware/errorMiddleware/notFoundError.middleware';
import { optionalConfig } from './config';
import { getLogger } from './common/logger';

const app: Express = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use(formatResponseMiddleware);

app.use('/v1', v1Router);

app.use(pathNotFoundMiddleware);

app.use(validationErrorMiddleware);
app.use(notFoundErrorMiddleware);
app.use(unknownErrorMiddleware);

app.get('/', (_req: Request, res: Response) => {
  res.send('My Server');
});

const port = optionalConfig.PORT;
const logger = getLogger(__filename);

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});
