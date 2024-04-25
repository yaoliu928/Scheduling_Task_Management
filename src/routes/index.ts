import Router from 'express';
import { scheduleRouter } from './schedule.router';
import { taskRouter } from './task.router';

const v1Router = Router();

v1Router.use('/schedules', scheduleRouter);
v1Router.use('/tasks', taskRouter);

export { v1Router };
