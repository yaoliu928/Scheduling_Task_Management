import Joi from 'joi';

const addScheduleSchema = Joi.object({
  accountId: Joi.number().integer().required(),
  agentId: Joi.number().integer().required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().greater(Joi.ref('startTime')).required(),
});

const updateScheduleSchema = Joi.object({
  accountId: Joi.number().integer().optional(),
  agentId: Joi.number().integer().optional(),
  startTime: Joi.date().iso().optional(),
  endTime: Joi.date()
    .iso()
    .optional()
    .when('startTime', {
      is: Joi.exist(),
      then: Joi.date().greater(Joi.ref('startTime')),
    }),
});

export { addScheduleSchema, updateScheduleSchema };
