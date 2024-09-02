import User from "@modules/users/infra/typeorm/entities/User";
import { DataSource } from "typeorm";

require("dotenv").config();

export const dataSource = new DataSource({
  type: "mongodb",
  database: process.env.DB_NAME,
  synchronize: true,
  logging: ["query", "error"],
  entities: [User],
  migrations: [],
  subscribers: [],
});
