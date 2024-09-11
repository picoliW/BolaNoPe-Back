const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

export const UpdateReserveSchema = Joi.object({
  id_user: Joi.objectId(),
  start_hour: Joi.string(),
  end_hour: Joi.string(),
  id_field: Joi.objectId(),
});
