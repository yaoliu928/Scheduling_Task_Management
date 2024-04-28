import Joi from 'joi';

const scheduleSchema = Joi.object({
  accountId: Joi.number().integer().required(),
  agentId: Joi.number().integer().required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().greater(Joi.ref('startTime')).required(),
});

export { scheduleSchema };
