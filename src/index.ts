import { Prisma, PrismaClient } from '@prisma/client';

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { v1Router } from './routes';

dotenv.config();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/v1', v1Router);

app.get('/', (req: Request, res: Response) => {
  res.send('My Server');
});

app.post(`/schedules`, async (req, res) => {
  const { accountId, agentId, startTime, endTime } = req.body;
  const result = await prisma.schedule.create({
    data: {
      accountId,
      agentId,
      startTime,
      endTime,
    },
  });
  res.json(result);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
