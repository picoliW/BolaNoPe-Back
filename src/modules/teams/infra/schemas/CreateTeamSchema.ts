import { Joi, Segments, celebrate } from "celebrate";

export const CreateTeamSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string(),
    leader_id: Joi.string().required(),
    members_id: Joi.array(),
    tourneys_id: Joi.array(),
  },
});
