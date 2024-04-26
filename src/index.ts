import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { v1Router } from './routes';
import { formatResponse } from './middleware/formatResponse.middleware';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(formatResponse);

app.use('/v1', v1Router);

app.get('/', (req: Request, res: Response) => {
  res.send('My Server');
});

dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
