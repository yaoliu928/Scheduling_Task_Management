import Router from 'express';
import { addTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById } from '../controllers/task.controller';

const taskRouter = Router();

taskRouter.get('/', getAllTasks);
taskRouter.post('/', addTask);
taskRouter.get('/:id', getTaskById);
taskRouter.put('/:id', updateTaskById);
taskRouter.delete('/:id', deleteTaskById);

export { taskRouter };
