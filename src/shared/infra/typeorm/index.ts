import Field from "@modules/fields/infra/typeorm/entities/Field";
import User from "@modules/users/infra/typeorm/entities/User";
import { DataSource } from "typeorm";

require("dotenv").config();

export const dataSource = new DataSource({
  type: "mongodb",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  synchronize: true,
  logging: ["query", "error"],
  entities: [User, Field],
  migrations: [],
  subscribers: [],
});
