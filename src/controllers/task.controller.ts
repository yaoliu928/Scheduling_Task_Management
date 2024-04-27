import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';
import { prisma } from '../common/utils/prismaClient';
import { NotFoundException } from '../common/exceptions/notFound.exception';
import { getLogger } from '../common/logger';
import { taskSchema } from '../validations/task.schema';
import { TimeExcessException } from '../common/exceptions/timeExcess.exception';

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
    // validation for request body
    const validBody = await taskSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });

    // check if task time exceeds schedule time range
    const { scheduleId, startTime, duration } = req.body;
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
    });
    if (!schedule) {
      throw new NotFoundException(`Schedule that task wants to add is not found: ${scheduleId}.`);
    }
    if (
      dayjs(startTime).isBefore(dayjs(schedule.startTime)) ||
      dayjs(schedule.endTime).isBefore(dayjs(startTime).add(duration, 'minute'))
    ) {
      throw new TimeExcessException(`Task time exceeds schedule time range.`);
    }

    // create task in DB
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
    // validation for request body
    const validBody = await taskSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });

    // check if task time exceeds schedule time range
    const { scheduleId, startTime, duration } = req.body;
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
    });
    if (!schedule) {
      throw new NotFoundException(`Schedule that task wants to add is not found: ${scheduleId}.`);
    }
    if (
      dayjs(startTime).isBefore(dayjs(schedule.startTime)) ||
      dayjs(schedule.endTime).isBefore(dayjs(startTime).add(duration, 'minute'))
    ) {
      throw new TimeExcessException(`Task time exceeds schedule time range.`);
    }

    // update task in DB
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
