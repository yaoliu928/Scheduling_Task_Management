import { prisma } from '../utils/prismaClient';

const addSchedule = async (
  req: { body: { accountId: number; agentId: number; startTime: Date; endTime: Date } },
  res: { json: (arg0: { id: string; accountId: number; agentId: number; startTime: Date; endTime: Date }) => void },
) => {
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
};

export { addSchedule };
