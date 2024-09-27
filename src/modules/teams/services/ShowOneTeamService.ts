import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import Team from "../infra/typeorm/entities/Team";

@injectable()
class ShowOneTeamService {
  constructor(
    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(_id: ObjectId): Promise<Team | null> {
    const team = await this.teamsRepository.findById(new ObjectId(_id));

    return team;
  }
}

export default ShowOneTeamService;
