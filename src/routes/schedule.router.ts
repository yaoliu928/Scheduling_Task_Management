import Router from 'express';
import { addSchedule } from '../controllers/schedule.controller';

const scheduleRouter = Router();

scheduleRouter.post('/', addSchedule);

export { scheduleRouter };
