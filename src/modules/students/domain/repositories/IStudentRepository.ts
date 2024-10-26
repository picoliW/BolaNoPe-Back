import { ObjectId } from "mongodb";
import { ICreateStudent } from "../models/ICreateStudent";
import Student from "@modules/students/infra/typeorm/entities/Student";

export interface IStudentRepository {
  create({
    name,
    cpf,
    birth,
    email,
    cep,
    id_professor,
    patio,
    complement,
    neighborhood,
    locality,
    uf,
  }: ICreateStudent): Promise<Student>;
  save(student: Student): Promise<Student>;
  findByCPF(cpf: string): Promise<Student | null>;
  findById(id: ObjectId): Promise<Student | null>;
  findByProfessor(id_professor: ObjectId): Promise<Student[]>;
}
