import { Joi, Segments, celebrate } from "celebrate";

export const UpdateTeamSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    description: Joi.string(),
    leader_id: Joi.string(),
    members_id: Joi.array(),
    tourneys_id: Joi.array(),
  },
});
