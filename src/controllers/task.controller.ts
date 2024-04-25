import { $Enums, TaskType } from '@prisma/client';
import { prisma } from '../utils/prismaClient';

const getAllTasks = async (
  req: unknown,
  res: {
    json: (
      arg0: {
        id: string;
        accountId: number;
        scheduleId: string;
        startTime: Date;
        duration: number;
        type: $Enums.TaskType;
      }[],
    ) => void;
  },
) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
};

const addTask = async (
  req: { body: { accountId: number; scheduleId: string; startTime: Date; duration: number; type: TaskType } },
  res: {
    json: (arg0: {
      id: string;
      accountId: number;
      scheduleId: string;
      startTime: Date;
      duration: number;
      type: $Enums.TaskType;
    }) => void;
  },
) => {
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
  res.json(task);
};

const getTaskById = async (
  req: { params: { id: string } },
  res: {
    json: (
      arg0: {
        id: string;
        accountId: number;
        scheduleId: string;
        startTime: Date;
        duration: number;
        type: $Enums.TaskType;
      } | null,
    ) => void;
  },
) => {
  const { id } = req.params;

  const tasks = await prisma.task.findUnique({
    where: { id },
  });
  res.json(tasks);
};

const deleteTaskById = async (
  req: { params: { id: string } },
  res: {
    json: (arg0: {
      id: string;
      accountId: number;
      scheduleId: string;
      startTime: Date;
      duration: number;
      type: $Enums.TaskType;
    }) => void;
  },
) => {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: {
      id,
    },
  });
  res.json(task);
};

const updateTaskById = async (
  req: {
    params: { id: string };
    body: { accountId: number; scheduleId: string; startTime: Date; duration: number; type: TaskType };
  },
  res: {
    json: (arg0: {
      id: string;
      accountId: number;
      scheduleId: string;
      startTime: Date;
      duration: number;
      type: $Enums.TaskType;
    }) => void;
  },
) => {
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
  res.json(task);
};

export { addTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById };
