import { Joi, Segments, celebrate } from "celebrate";

export const CreateFieldSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    location: Joi.string().required(),
    value_hour: Joi.string().required(),
    obs: Joi.string(),
    file_url: Joi.string(),
    open_time: Joi.string().required(),
    close_time: Joi.string().required(),
    available: Joi.boolean().required(),
  },
});
