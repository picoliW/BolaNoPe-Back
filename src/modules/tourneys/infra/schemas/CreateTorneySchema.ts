import { Joi, Segments, celebrate } from "celebrate";

export const CreateTourneySchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string(),
    prize: Joi.string(),
    id_teams: Joi.array().required(),
  },
});
