import { Prisma, PrismaClient } from '@prisma/client';

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();
const prisma = new PrismaClient();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

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
