import User from "@modules/users/infra/typeorm/entities/User";
import { ICreateUser } from "../models/ICreateUser";
import { ObjectId } from "mongodb";

export interface IUsersRepository {
  create({
    name,
    cpf,
    birth,
    email,
    password,
    cep,
    file_url,
  }: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
  find(): Promise<User[]>;
  remove(user: User): Promise<void>;
  findById(id: ObjectId): Promise<User | null>;
  update(user: User): Promise<User>;
  findByRole(role: string): Promise<User[]>;
  findByCPF(cpf: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  countStudentsByProfessorId(id_professor: ObjectId): Promise<number>;
}
