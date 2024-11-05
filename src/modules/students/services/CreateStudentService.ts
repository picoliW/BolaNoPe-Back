import { inject, injectable } from "tsyringe";
import axios from "axios";
import { ConflictError } from "@shared/errors/ConflictError";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";
import Student from "../infra/typeorm/entities/Student";
import { IStudentRepository } from "../domain/repositories/IStudentRepository";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { ICreateStudent } from "../domain/models/ICreateStudent";

@injectable()
class CreateStudentService {
  constructor(
    @inject("StudentsRepository")
    private studentsRepository: IStudentRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
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

    const professor = await this.usersRepository.findById(
      new ObjectId(id_professor),
    );
    if (!professor || professor.role !== "professor") {
      throw new NotFoundError("Professor not found or invalid role");
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

    professor.students = professor.students || [];
    professor.students.push(student._id);

    await this.usersRepository.save(professor);

    return student;
  }
}

export default CreateStudentService;
