import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ConflictError } from "@shared/errors/ConflictError";
import { IUpdateUser } from "../domain/models/IUpdateUser";
import bcrypt from "bcrypt";

@injectable()
class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    _id,
    name,
    cpf,
    birth,
    email,
    password,
    cep,
  }: IUpdateUser): Promise<Partial<User>> {
    const user = await this.userRepository.findById(new ObjectId(_id));

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (cpf && user.cpf !== cpf) {
      const existingUser = await this.userRepository.findByCPF(cpf);
      if (existingUser) {
        throw new ConflictError("CPF already exists");
      }
      user.cpf = cpf;
    }

    if (email && user.email !== email) {
      const existingUserByEmail = await this.userRepository.findByEmail(email);
      if (existingUserByEmail) {
        throw new ConflictError("Email already exists");
      }
      user.email = email;
    }

    const updatedFields: Partial<User> = {};

    if (name) {
      user.name = name;
      updatedFields.name = name;
    }
    if (birth) {
      user.birth = birth;
      updatedFields.birth = birth;
    }
    if (email) {
      user.email = email;
      updatedFields.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      updatedFields.password = hashedPassword;
    }
    if (cep) {
      user.cep = cep;
      updatedFields.cep = cep;
    }

    await this.userRepository.save(user);

    return updatedFields;
  }
}

export default UpdateUserService;
