import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { UnauthorizedError } from "@shared/errors/UnauthorizedError";
import authConfig from "@shared/utils/auth";
import { ILoginRequest } from "../domain/models/ILoginRequest";
import { ILoginResponse } from "../domain/models/ILoginResponse";

@injectable()
class LoginService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: ILoginRequest): Promise<ILoginResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedError("Incorrect email/password combination");
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user._id.toString(),
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default LoginService;
