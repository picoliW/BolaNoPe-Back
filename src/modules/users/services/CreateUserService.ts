import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { ICreateUser } from "../domain/models/ICreateUser";
import User from "../infra/typeorm/entities/User";
import axios from "axios";
import bcrypt from "bcrypt";
import { ConflictError } from "@shared/errors/ConflictError";
import { sign } from "jsonwebtoken";
import authConfig from "@shared/utils/auth";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    cpf,
    birth,
    email,
    password,
    cep,
    role = "user",
    file,
  }: ICreateUser & { file?: Express.Multer.File }): Promise<{
    user: User;
    token: string;
  }> {
    let file_url = "";

    if (file) {
      file_url = file.path;
    }

    const existingUser = await this.usersRepository.findByCPF(cpf);
    if (existingUser) {
      throw new ConflictError("CPF already exists");
    }

    const existingUserByEmail = await this.usersRepository.findByEmail(email);
    if (existingUserByEmail) {
      throw new ConflictError("Email already exists");
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      cpf,
      birth,
      email,
      password: hashedPassword,
      cep,
      role,
      patio: addressFields.logradouro,
      complement: addressFields.complemento,
      neighborhood: addressFields.bairro,
      locality: addressFields.localidade,
      uf: addressFields.uf,
      file_url,
    });

    await this.usersRepository.save(user);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        role: user.role,
        userId: user._id.toString(),
      },
      secret,
      {
        subject: user._id.toString(),
        expiresIn,
      },
    );
    return {
      user,
      token,
    };
  }
}

export default CreateUserService;
