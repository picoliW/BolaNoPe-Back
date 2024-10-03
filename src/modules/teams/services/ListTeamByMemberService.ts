import { inject, injectable } from "tsyringe";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import Team from "../infra/typeorm/entities/Team";
import { ObjectId } from "mongodb";

@injectable()
class ListTeamsByMemberService {
  constructor(
    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(memberId: ObjectId): Promise<Team[]> {
    const teams = await this.teamsRepository.findByMemberId(memberId);
    return teams;
  }
}

export default ListTeamsByMemberService;
