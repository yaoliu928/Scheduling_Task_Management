import { Request, Response, NextFunction } from 'express';
import { prisma } from '../common/utils/prismaClient';
import { NotFoundException } from '../common/exceptions/notFound.exception';

const getAllTasks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await prisma.task.findMany();
    res.formatResponse(tasks);
  } catch (e) {
    // logger.info(e.message);
    next(e);
  }
};

const addTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
  } catch (e) {
    // logger.info(e.message);
    next(e);
  }
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task not found: ${id}`);
    }
    res.formatResponse(task);
  } catch (e) {
    // logger.info(e.message);
    next(e);
  }
};

const updateTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task not found: ${id}`);
    }

    const { accountId, scheduleId, startTime, duration, type } = req.body;
    const newTask = await prisma.task.update({
      where: { id },
      data: {
        accountId,
        scheduleId,
        startTime,
        duration,
        type,
      },
    });
    res.formatResponse(newTask);
  } catch (e) {
    // logger.info(e.message);
    next(e);
  }
};

const deleteTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task not found: ${id}`);
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });
    res.formatResponse('', 204);
  } catch (e) {
    // logger.info(e.message);
    next(e);
  }
};

export { addTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById };
