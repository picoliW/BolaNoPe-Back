import { Joi, Segments, celebrate } from "celebrate";

export const UpdateFieldSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    location: Joi.string(),
    value_hour: Joi.string(),
    obs: Joi.string(),
    open_time: Joi.string(),
    close_time: Joi.string(),
    available: Joi.boolean(),
  },
});
