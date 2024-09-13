const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

export const CreateReserveSchema = Joi.object({
  id_user: Joi.objectId().required(),
  start_hour: Joi.string().required(),
  end_hour: Joi.string().required(),
  reserve_day: Joi.string().required(),
  id_field: Joi.objectId().required(),
});
