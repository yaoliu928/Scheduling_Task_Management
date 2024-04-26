import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

const getAllSchedules = async (_req: Request, res: Response) => {
  const schedules = await prisma.schedule.findMany();
  res.formatResponse(schedules);
};

const addSchedule = async (req: Request, res: Response) => {
  const { accountId, agentId, startTime, endTime } = req.body;
  const schedule = await prisma.schedule.create({
    data: {
      accountId,
      agentId,
      startTime,
      endTime,
    },
  });
  res.formatResponse(schedule, 201);
};

const getScheduleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedule = await prisma.schedule.findUnique({
    where: { id },
  });
  res.formatResponse(schedule);
};

const updateScheduleById = async (req: Request, res: Response) => {
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
  res.formatResponse(schedule);
};

const deleteScheduleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const tasks = await prisma.task.findMany({
    where: { scheduleId: id },
  });

  if (tasks.length > 0) {
    throw new Error('Cannot delete user because they have posts.');
  }

  const schedule = await prisma.schedule.delete({
    where: {
      id,
    },
  });
  if (!schedule) {
    throw new Error(`Schedule not found: ${id}`);
  }
  res.formatResponse('', 204);
};

export { addSchedule, getAllSchedules, getScheduleById, deleteScheduleById, updateScheduleById };
