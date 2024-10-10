import { inject, injectable } from "tsyringe";
import { ITourneyRepository } from "../domain/repositories/ITourneyRepository";
import { ITeamRepository } from "@modules/teams/domain/repositories/ITeamRepository";
import { ObjectId } from "mongodb";
import Team from "@modules/teams/infra/typeorm/entities/Team";
import { NotFoundError } from "@shared/errors/NotFoundError";

@injectable()
class ListTeamsInTourneyService {
  constructor(
    @inject("TourneysRepository")
    private tourneysRepository: ITourneyRepository,

    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(tourneyId: ObjectId): Promise<Team[]> {
    const tourney = await this.tourneysRepository.findById(tourneyId);

    if (!tourney) {
      throw new NotFoundError("Tourney not found");
    }

    const teams = await this.teamsRepository.find();

    const teamsInTourney = teams.filter(team =>
      tourney.id_teams.includes(team._id.toHexString()),
    );

    return teamsInTourney;
  }
}

export default ListTeamsInTourneyService;
