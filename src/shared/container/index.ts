import { IFieldsRepository } from "@modules/fields/domain/repositories/IFieldRepository";
import FieldsRepository from "@modules/fields/infra/typeorm/repositories/FieldRepository";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IFieldsRepository>(
  "FieldsRepository",
  FieldsRepository,
);
