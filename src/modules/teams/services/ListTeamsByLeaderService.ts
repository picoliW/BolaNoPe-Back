import { inject, injectable } from "tsyringe";
import Team from "../infra/typeorm/entities/Team";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";

@injectable()
class ListTeamsByLeaderService {
  constructor(
    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(leaderId: string): Promise<Team[]> {
    const teams = await this.teamsRepository.findByLeaderId(leaderId);
    return teams;
  }
}

export default ListTeamsByLeaderService;
