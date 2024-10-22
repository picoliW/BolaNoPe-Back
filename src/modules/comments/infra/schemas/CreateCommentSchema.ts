const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

export const CreateReserveSchema = Joi.object({
  team_id: Joi.objectId().required(),
  user_id: Joi.string().required(),
  comment: Joi.string().required(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
});
