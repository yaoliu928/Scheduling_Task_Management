import Joi from 'joi';

const taskSchema = Joi.object({
  accountId: Joi.number().integer().required(),
  scheduleId: Joi.string().uuid().required(),
  startTime: Joi.date().iso().required(),
  duration: Joi.number().integer().min(1).required(),
  type: Joi.string().valid('break', 'work').required(),
});

export { taskSchema };
