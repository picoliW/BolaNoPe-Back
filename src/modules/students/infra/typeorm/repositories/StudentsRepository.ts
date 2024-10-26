import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { ObjectId } from "mongodb";
import Student from "../entities/Student";
import { ICreateStudent } from "@modules/students/domain/models/ICreateStudent";

class StudentsRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Student);
  }

  public async create({
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
  }: ICreateStudent): Promise<Student> {
    const student = this.ormRepository.create({
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
    });

    await this.ormRepository.save(student);
    return student;
  }

  public async save(student: Student): Promise<Student> {
    await this.ormRepository.save(student);
    return student;
  }

  public async findByCPF(cpf: string): Promise<Student | null> {
    const student = await this.ormRepository.findOne({
      where: { cpf },
    });
    return student;
  }

  public async findById(id: ObjectId): Promise<Student | null> {
    const student = await this.ormRepository.findOne({
      where: { _id: id },
    });
    return student;
  }

  public async findByProfessor(id_professor: ObjectId): Promise<Student[]> {
    const students = await this.ormRepository.find({
      where: { id_professor },
    });
    return students;
  }
}

export default StudentsRepository;
