import { inject, injectable } from "tsyringe";
import Team from "../infra/typeorm/entities/Team";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";

@injectable()
class ListTeamService {
  constructor(
    @inject("TeamsRepository")
    private teamRepository: ITeamRepository,
  ) {}
  public async execute(): Promise<Team[]> {
    const teams = await this.teamRepository.find();

    return teams;
  }
}

export default ListTeamService;
