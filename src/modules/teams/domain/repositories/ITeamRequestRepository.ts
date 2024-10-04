import { ObjectId } from "mongodb";
import { ICreateTeam } from "../models/ICreateTeam";
import Team from "@modules/teams/infra/typeorm/entities/Team";
import TeamRequest from "@modules/teams/infra/typeorm/entities/TeamRequest";

export interface ITeamRequestRepository {
  create(data: Omit<TeamRequest, "_id">): Promise<TeamRequest>;
  save(request: TeamRequest): Promise<TeamRequest>;
  findById(id: ObjectId): Promise<TeamRequest | null>;
  findByTeamAndUser(
    teamId: string,
    userId: string,
  ): Promise<TeamRequest | null>;
}
