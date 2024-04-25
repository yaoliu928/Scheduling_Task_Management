import { prisma } from '../utils/prismaClient';

const getAllSchedules = async (
  req: unknown,
  res: { json: (arg0: { id: string; accountId: number; agentId: number; startTime: Date; endTime: Date }[]) => void },
) => {
  const schedules = await prisma.schedule.findMany();
  res.json(schedules);
};

const addSchedule = async (
  req: { body: { accountId: number; agentId: number; startTime: Date; endTime: Date } },
  res: { json: (arg0: { id: string; accountId: number; agentId: number; startTime: Date; endTime: Date }) => void },
) => {
  const { accountId, agentId, startTime, endTime } = req.body;
  const schedule = await prisma.schedule.create({
    data: {
      accountId,
      agentId,
      startTime,
      endTime,
    },
  });
  res.json(schedule);
};

const getScheduleById = async (
  req: { params: { id: string | undefined } },
  res: {
    json: (arg0: { id: string; accountId: number; agentId: number; startTime: Date; endTime: Date } | null) => void;
  },
) => {
  const { id } = req.params;

  const schedules = await prisma.schedule.findUnique({
    where: { id },
  });
  res.json(schedules);
};

const deleteScheduleById = async (
  req: { params: { id: string | undefined } },
  res: { json: (arg0: { id: string; accountId: number; agentId: number; startTime: Date; endTime: Date }) => void },
) => {
  const { id } = req.params;
  const schedule = await prisma.schedule.delete({
    where: {
      id,
    },
  });
  res.json(schedule);
};

const updateScheduleById = async (
  req: { params: { id: string }; body: { accountId: number; agentId: number; startTime: Date; endTime: Date } },
  res: { json: (arg0: { id: string; accountId: number; agentId: number; startTime: Date; endTime: Date }) => void },
) => {
  const { id } = req.params;
  const { accountId, agentId, startTime, endTime } = req.body;

  const schedule = await prisma.schedule.update({
    where: { id },
    data: {
      accountId,
      agentId,
      startTime,
      endTime,
    },
  });
  res.json(schedule);
};

export { addSchedule, getAllSchedules, getScheduleById, deleteScheduleById, updateScheduleById };
