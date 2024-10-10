import { inject, injectable } from "tsyringe";
import { ITourneyRepository } from "../domain/repositories/ITourneyRepository";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { BadRequestError } from "@shared/errors/BadRequestError";

@injectable()
class RemoveTeamFromTourneyService {
  constructor(
    @inject("TourneysRepository")
    private tourneysRepository: ITourneyRepository,
  ) {}

  public async execute(tourneyId: ObjectId, teamId: ObjectId): Promise<void> {
    const tourney = await this.tourneysRepository.findById(tourneyId);

    if (!tourney) {
      throw new NotFoundError("Tourney not found");
    }

    tourney.id_teams = tourney.id_teams.filter(id => id !== teamId.toString());

    await this.tourneysRepository.save(tourney);
  }
}

export default RemoveTeamFromTourneyService;
