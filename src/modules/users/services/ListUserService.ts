import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import { IRoleFilter } from "../domain/models/IRoleFilter";

@injectable()
class ListUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}
  public async execute({ role }: IRoleFilter): Promise<User[]> {
    if (role) {
      return this.userRepository.findByRole(role);
    }
    return this.userRepository.find();
  }
}

export default ListUserService;
