import { inject, injectable } from "tsyringe";
import { ITourneyRepository } from "../domain/repositories/ITourneyRepository";
import Tourney from "../infra/typeorm/entities/Tourney";
import { ITeamRepository } from "@modules/teams/domain/repositories/ITeamRepository";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@shared/errors/NotFoundError";

@injectable()
class AddTeamToTourneyService {
  constructor(
    @inject("TourneysRepository")
    private tourneysRepository: ITourneyRepository,

    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(
    tourneyId: ObjectId,
    teamId: ObjectId,
  ): Promise<Tourney> {
    const tourney = await this.tourneysRepository.findById(tourneyId);
    if (!tourney) {
      throw new NotFoundError("Tourney not found");
    }

    const team = await this.teamsRepository.findById(teamId);
    if (!team) {
      throw new NotFoundError("Team not found");
    }

    if (!tourney.id_teams.includes(teamId.toHexString())) {
      tourney.id_teams.push(teamId.toHexString());
    }

    await this.tourneysRepository.save(tourney);

    return tourney;
  }
}

export default AddTeamToTourneyService;
