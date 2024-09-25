import { inject, injectable } from "tsyringe";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import { ICreateTeam } from "../domain/models/ICreateTeam";
import Team from "../infra/typeorm/entities/Team";

@injectable()
class CreateTeamService {
  constructor(
    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(
    { name, description, leader_id, members_id, tourneys_id }: ICreateTeam,
    loggedInUserId: string,
  ): Promise<Team> {
    const updatedMembersId = members_id
      ? [...members_id, loggedInUserId]
      : [loggedInUserId];

    const team = await this.teamsRepository.create({
      name,
      description,
      leader_id: loggedInUserId,
      members_id: updatedMembersId,
      tourneys_id,
    });

    await this.teamsRepository.save(team);

    return team;
  }
}

export default CreateTeamService;
