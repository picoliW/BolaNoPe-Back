import { ObjectId } from "mongodb";
import { ICreateTeam } from "../models/ICreateTeam";
import Team from "@modules/teams/infra/typeorm/entities/Team";

export interface ITeamRepository {
  create({
    name,
    description,
    leader_id,
    members_id,
    tourneys_id,
  }: ICreateTeam): Promise<Team>;
  save(team: Team): Promise<Team>;
  find(): Promise<Team[]>;
  remove(team: Team): Promise<void>;
  findById(id: ObjectId): Promise<Team | null>;
  update(team: Team): Promise<Team>;
  findByMemberId(memberId: ObjectId): Promise<Team[]>;
}
