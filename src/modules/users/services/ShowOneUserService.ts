import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";

@injectable()
class ShowOneUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(_id: ObjectId): Promise<User | null> {
    const user = await this.usersRepository.findById(new ObjectId(_id));

    return user;
  }
}

export default ShowOneUserService;
