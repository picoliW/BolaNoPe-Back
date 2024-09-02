import { ObjectId } from "mongodb";

export interface IUpdateUser {
  _id: ObjectId;
  name: string;
  cpf: string;
  birth: string;
  email: string;
  password: string;
  cep: string;
}
