import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import { IUpdateTeam } from "../domain/models/IUpdateTeam";
import Team from "../infra/typeorm/entities/Team";

@injectable()
class UpdateTeamService {
  constructor(
    @inject("TeamsRepository")
    private teamRepository: ITeamRepository,
  ) {}

  public async execute({
    _id,
    name,
    description,
    leader_id,
    members_id,
    tourneys_id,
  }: IUpdateTeam): Promise<Partial<Team>> {
    const team = await this.teamRepository.findById(new ObjectId(_id));

    if (!team) {
      throw new NotFoundError("Team not found");
    }

    const updatedTeams: Partial<Team> = {};

    if (name) {
      team.name = name;
      updatedTeams.name = name;
    }
    if (description) {
      team.description = description;
      updatedTeams.description = description;
    }
    if (leader_id) {
      team.leader_id = leader_id;
      updatedTeams.leader_id = leader_id;
    }
    if (members_id) {
      team.members_id = members_id;
      updatedTeams.members_id = members_id;
    }
    if (tourneys_id) {
      team.tourneys_id = tourneys_id;
      updatedTeams.tourneys_id = tourneys_id;
    }

    await this.teamRepository.save(team);

    return updatedTeams;
  }
}

export default UpdateTeamService;
