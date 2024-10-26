import { inject, injectable } from "tsyringe";
import axios from "axios";
import { ConflictError } from "@shared/errors/ConflictError";
import { ObjectId } from "mongodb";
import Student from "../infra/typeorm/entities/Student";
import { IStudentRepository } from "../domain/repositories/IStudentRepository";
import { ICreateStudent } from "../domain/models/ICreateStudent";

@injectable()
class CreateStudentService {
  constructor(
    @inject("StudentsRepository")
    private studentsRepository: IStudentRepository,
  ) {}

  public async execute({
    name,
    cpf,
    birth,
    email,
    cep,
    id_professor,
  }: ICreateStudent): Promise<Student> {
    const existingStudent = await this.studentsRepository.findByCPF(cpf);
    if (existingStudent) {
      throw new ConflictError("CPF already exists");
    }

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    const { logradouro, complemento, bairro, localidade, uf } = response.data;

    const addressFields = {
      logradouro: logradouro || "N/A",
      complemento: complemento || "N/A",
      bairro: bairro || "N/A",
      localidade: localidade || "N/A",
      uf: uf || "N/A",
    };

    const student = await this.studentsRepository.create({
      name,
      cpf,
      birth,
      email,
      cep,
      id_professor,
      patio: addressFields.logradouro,
      complement: addressFields.complemento,
      neighborhood: addressFields.bairro,
      locality: addressFields.localidade,
      uf: addressFields.uf,
    });

    return student;
  }
}

export default CreateStudentService;
