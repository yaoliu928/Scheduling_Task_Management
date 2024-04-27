import { Request, Response, NextFunction } from 'express';
import { prisma } from '../common/utils/prismaClient';
import { NotFoundException } from '../common/exceptions/notFound.exception';
import { getLogger } from '../common/logger';
import { addTaskSchema, updateTaskSchema } from '../validations/task.schema';

const logger = getLogger(__filename);
const getAllTasks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await prisma.task.findMany();
    res.formatResponse(tasks);
  } catch (e) {
    if (e instanceof Error) {
      logger.info(e.message);
    }
    next(e);
  }
};

const addTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validBody = await addTaskSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    // const { accountId, scheduleId, startTime, duration, type } = req.body;
    const task = await prisma.task.create({
      data: validBody,
    });
    res.formatResponse(task, 201);
  } catch (e) {
    if (e instanceof Error) {
      logger.info(e.message);
    }
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
    if (e instanceof Error) {
      logger.info(e.message);
    }
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

    // const { accountId, scheduleId, startTime, duration, type } = req.body;
    const validBody = await updateTaskSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    const newTask = await prisma.task.update({
      where: { id },
      data: validBody,
    });
    res.formatResponse(newTask);
  } catch (e) {
    if (e instanceof Error) {
      logger.info(e.message);
    }
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
    if (e instanceof Error) {
      logger.info(e.message);
    }
    next(e);
  }
};

export { addTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById };
