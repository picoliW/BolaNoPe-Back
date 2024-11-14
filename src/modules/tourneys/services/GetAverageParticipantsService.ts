import { inject, injectable } from "tsyringe";
import { ITourneyRepository } from "../domain/repositories/ITourneyRepository";

@injectable()
class GetAverageParticipantsService {
  constructor(
    @inject("TourneysRepository")
    private tourneysRepository: ITourneyRepository,
  ) {}

  public async execute(): Promise<number> {
    const tourneys = await this.tourneysRepository.find();

    if (tourneys.length === 0) {
      return 0;
    }

    const totalTeams = tourneys.reduce(
      (sum, tourney) => sum + tourney.id_teams.length,
      0,
    );
    const averageTeams = totalTeams / tourneys.length;

    return averageTeams;
  }
}

export default GetAverageParticipantsService;
