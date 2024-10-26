import { Joi, Segments, celebrate } from "celebrate";

export const CreateStudentSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    cpf: Joi.required(),
    birth: Joi.string().required(),
    email: Joi.string().email(),
    cep: Joi.string().required(),
    id_professor: Joi.string().required(),
  },
});
