import { Joi, Segments, celebrate } from "celebrate";

export const CreateTourneySchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string(),
    prize: Joi.string(),
    id_teams: Joi.array().required(),
    id_winner_team: Joi.string(),
    date_from: Joi.string().required(),
    date_until: Joi.string().required(),
  },
});
