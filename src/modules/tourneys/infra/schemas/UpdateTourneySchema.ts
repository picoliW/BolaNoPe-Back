import { Joi, Segments, celebrate } from "celebrate";

export const UpdateTourneySchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    description: Joi.string(),
    prize: Joi.string(),
    id_teams: Joi.array(),
  },
});
