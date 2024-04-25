import Router from 'express';
import { scheduleRouter } from './schedule.router';

const v1Router = Router();

v1Router.use('/schedules', scheduleRouter);

export { v1Router };
