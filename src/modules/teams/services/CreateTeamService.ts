import { inject, injectable } from "tsyringe";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import { ICreateTeam } from "../domain/models/ICreateTeam";
import Team from "../infra/typeorm/entities/Team";
import { BadRequestError } from "@shared/errors/BadRequestError";

@injectable()
class CreateTeamService {
  private MAX_TEAM_MEMBERS = 5;

  constructor(
    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(
    { name, description, leader_id, members_id, tourneys_id, file }: ICreateTeam & { file?: Express.Multer.File },
    loggedInUserId: string,
  ): Promise<Team> {
    let file_url = "";

    if (file) {
      file_url = file.path;
    }

    if (members_id && members_id.includes(leader_id)) {
      members_id.splice(members_id.indexOf(leader_id), 1);
    }

    const updatedMembersId = members_id
      ? [...members_id, leader_id]
      : [leader_id];

    if (updatedMembersId.length > this.MAX_TEAM_MEMBERS) {
      throw new BadRequestError(
        `A equipe pode ter no máximo ${this.MAX_TEAM_MEMBERS} membros.`,
      );
    }

    const team = await this.teamsRepository.create({
      name,
      description,
      leader_id: leader_id,
      members_id: updatedMembersId,
      tourneys_id,
      file_url
    });

    await this.teamsRepository.save(team);

    return team;
  }
}

export default CreateTeamService;
