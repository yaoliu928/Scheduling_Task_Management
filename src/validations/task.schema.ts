import Joi from 'joi';

const addTaskSchema = Joi.object({
  accountId: Joi.number().integer().required(),
  scheduleId: Joi.string().uuid().required(),
  startTime: Joi.date().iso().required(),
  duration: Joi.number().integer().min(1).required(),
  type: Joi.string().valid('break', 'work').required(),
});

const updateTaskSchema = Joi.object({
  accountId: Joi.number().integer().optional(),
  scheduleId: Joi.string().uuid().optional(),
  startTime: Joi.date().iso().optional(),
  duration: Joi.number().integer().min(1).optional(),
  type: Joi.string().valid('break', 'work').optional(),
});

export { addTaskSchema, updateTaskSchema };
