import User from "@modules/users/infra/typeorm/entities/User";

export interface ILoginResponse {
  user: User;
  token: string;
}
