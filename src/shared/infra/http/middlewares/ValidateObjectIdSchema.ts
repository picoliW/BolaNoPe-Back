const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

export const ValidateObjectId = Joi.object({
  id: Joi.objectId(),
});
