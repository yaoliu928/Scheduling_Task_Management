import { Request, Response, NextFunction } from 'express';
import { prisma } from '../common/utils/prismaClient';
import { NotFoundException } from '../common/exceptions/notFound.exception';
import { getLogger } from '../common/logger';
import { addScheduleSchema, updateScheduleSchema } from '../validations/schedule.schema';

const logger = getLogger(__filename);
const getAllSchedules = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const schedules = await prisma.schedule.findMany();
    res.formatResponse(schedules);
  } catch (e) {
    if (e instanceof Error) {
      logger.info(e.message);
    }
    next(e);
  }
};

const addSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validBody = await addScheduleSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    const schedule = await prisma.schedule.create({
      data: validBody,
    });
    res.formatResponse(schedule, 201);
  } catch (e) {
    if (e instanceof Error) {
      logger.info(e.message);
    }
    next(e);
  }
};

const getScheduleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const schedule = await prisma.schedule.findUnique({
      where: { id },
    });
    if (!schedule) {
      throw new NotFoundException(`Schedule not found: ${id}`);
    }
    res.formatResponse(schedule);
  } catch (e) {
    if (e instanceof Error) {
      logger.info(e.message);
    }
    next(e);
  }
};

const updateScheduleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const schedule = await prisma.schedule.findUnique({
      where: { id },
    });
    if (!schedule) {
      throw new NotFoundException(`Schedule not found: ${id}`);
    }
    const validBody = await updateScheduleSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    const newSchedule = await prisma.schedule.update({
      where: { id },
      data: validBody,
    });
    res.formatResponse(newSchedule);
  } catch (e) {
    if (e instanceof Error) {
      logger.info(e.message);
    }
    next(e);
  }
};

const deleteScheduleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const tasks = await prisma.task.findMany({
      where: { scheduleId: id },
    });
    if (tasks.length > 0) {
      throw new Error('Cannot delete schedule because it has tasks.');
    }
    const schedule = await prisma.schedule.findUnique({
      where: { id },
    });
    if (!schedule) {
      throw new NotFoundException(`Schedule not found: ${id}`);
    }
    await prisma.schedule.delete({
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

export { addSchedule, getAllSchedules, getScheduleById, deleteScheduleById, updateScheduleById };
