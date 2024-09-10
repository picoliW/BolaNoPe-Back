import { Joi, Segments, celebrate } from "celebrate";

export const CreateFieldSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    location: Joi.string().required(),
    value: Joi.string().required(),
    obs: Joi.string(),
    days: Joi.string().required(),
    schedules: Joi.string().required(),
    available: Joi.boolean().required(),
  },
});
