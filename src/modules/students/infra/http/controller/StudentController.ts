import { Request, Response } from "express";
import { container } from "tsyringe";
import { ObjectId } from "mongodb";
import { ConflictError } from "@shared/errors/ConflictError";
import CreateStudentService from "@modules/students/services/ICreateStudent";

export default class StudentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, cpf, birth, email, cep, id_professor } = req.body;

    const createStudent = container.resolve(CreateStudentService);

    try {
      const student = await createStudent.execute({
        name,
        cpf,
        birth,
        email,
        cep,
        id_professor,
      });

      return res.status(201).json(student);
    } catch (error) {
      if (error instanceof ConflictError) {
        return res.status(409).json({ message: error.message });
      }
      throw error;
    }
  }
}
