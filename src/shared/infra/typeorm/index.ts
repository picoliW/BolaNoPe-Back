import Field from "@modules/fields/infra/typeorm/entities/Field";
import Reserve from "@modules/reserves/infra/typeorm/entities/Reserve";
import Team from "@modules/teams/infra/typeorm/entities/Team";
import Tourney from "@modules/tourneys/infra/typeorm/entities/Tourney";
import User from "@modules/users/infra/typeorm/entities/User";
import { DataSource } from "typeorm";

require("dotenv").config();

export const dataSource = new DataSource({
  type: "mongodb",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  synchronize: true,
  logging: ["query", "error"],
  entities: [User, Field, Reserve, Tourney, Team],
  migrations: [],
  subscribers: [],
});
