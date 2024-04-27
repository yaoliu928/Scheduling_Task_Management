import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { v1Router } from './routes';
import { formatResponseMiddleware } from './middleware/formatResponse.middleware';
import { pathNotFoundMiddleware } from './middleware/pathNotFound.middleware';
import { validationErrorMiddleware } from './middleware/errorMiddleware/validationError.middleware';
import { unknownErrorMiddleware } from './middleware/errorMiddleware/unknownError.middleware';
import { notFoundErrorMiddleware } from './middleware/errorMiddleware/notFoundError.middleware';
import { morganLog } from './common/morgan';
import { TimeExcessErrorMiddleware } from './middleware/errorMiddleware/timeExcessError.middleware';

const app: Express = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use(formatResponseMiddleware);

app.use(morganLog);

app.use('/v1', v1Router);

app.use(pathNotFoundMiddleware);

app.use(validationErrorMiddleware);
app.use(TimeExcessErrorMiddleware);
app.use(notFoundErrorMiddleware);
app.use(unknownErrorMiddleware);

export { app };
