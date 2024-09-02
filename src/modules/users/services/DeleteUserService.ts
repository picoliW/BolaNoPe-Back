import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IDeleteUser } from "../domain/models/IDeleteUser";

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ _id }: IDeleteUser): Promise<void> {
    try {
      const user = await this.userRepository.findById(new ObjectId(_id));

      if (!user) {
        throw new NotFoundError("User not found");
      }

      await this.userRepository.remove(user);
    } catch (error) {
      throw error;
    }
  }
}

export default DeleteUserService;
