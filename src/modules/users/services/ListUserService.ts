import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";

@injectable()
class ListUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}
  public async execute(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }
}

export default ListUserService;
