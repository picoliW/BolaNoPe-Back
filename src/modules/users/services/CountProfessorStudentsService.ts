import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
class CountProfessorStudentsService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id_professor: ObjectId): Promise<number> {
    const studentCount =
      await this.usersRepository.countStudentsByProfessorId(id_professor);

    if (studentCount === null) {
      throw new NotFoundError("Professor not found");
    }

    return studentCount;
  }
}

export default CountProfessorStudentsService;
