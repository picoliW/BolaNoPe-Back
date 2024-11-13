import { Joi, Segments, celebrate } from "celebrate";

export const CreateRatingSchema = celebrate({
  [Segments.BODY]: {
    field_id: Joi.required(),
    rating: Joi.number().required(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
  },
});
