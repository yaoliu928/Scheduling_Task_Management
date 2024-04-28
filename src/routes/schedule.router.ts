import Router from 'express';
import {
  addSchedule,
  getAllSchedules,
  getScheduleById,
  deleteScheduleById,
  updateScheduleById,
} from '../controllers/schedule.controller';

const scheduleRouter = Router();

scheduleRouter.get('/', getAllSchedules);
scheduleRouter.post('/', addSchedule);
scheduleRouter.get('/:id', getScheduleById);
scheduleRouter.put('/:id', updateScheduleById);
scheduleRouter.delete('/:id', deleteScheduleById);

export { scheduleRouter };
