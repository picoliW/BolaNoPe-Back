import { Joi, Segments, celebrate } from "celebrate";

export const CreateNotificationSchema = celebrate({
  [Segments.BODY]: {
    userId: Joi.string().required(),
    title: Joi.string().required(),
    message: Joi.string().required(),
    read: Joi.boolean(),
  },
});
