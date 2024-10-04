import { inject, injectable } from "tsyringe";
import { ITeamRequestRepository } from "../domain/repositories/ITeamRequestRepository";
import TeamRequest from "../infra/typeorm/entities/TeamRequest";

@injectable()
class ListTeamRequestsService {
  constructor(
    @inject("TeamRequestRepository")
    private teamRequestRepository: ITeamRequestRepository,
  ) {}

  public async execute(teamId: string): Promise<TeamRequest[]> {
    const teamRequests = await this.teamRequestRepository.findByTeamId(teamId);
    return teamRequests;
  }
}

export default ListTeamRequestsService;
