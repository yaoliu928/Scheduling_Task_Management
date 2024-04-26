import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.formatResponse(tasks);
};

const addTask = async (req: Request, res: Response) => {
  const { accountId, scheduleId, startTime, duration, type } = req.body;
  const task = await prisma.task.create({
    data: {
      accountId,
      scheduleId,
      startTime,
      duration,
      type,
    },
  });
  res.formatResponse(task, 201);
};

const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({
    where: { id },
  });
  res.formatResponse(task);
};

const updateTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { accountId, scheduleId, startTime, duration, type } = req.body;

  const task = await prisma.task.update({
    where: { id },
    data: {
      accountId,
      scheduleId,
      startTime,
      duration,
      type,
    },
  });
  res.formatResponse(task);
};

const deleteTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: {
      id,
    },
  });
  if (!task) {
    throw new Error(`task not found: ${id}`);
  }
  res.formatResponse('', 204);
};

export { addTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById };
