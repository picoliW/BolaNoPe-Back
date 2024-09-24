import { inject, injectable } from "tsyringe";
import { ITourneyRepository } from "../domain/repositories/ITourneyRepository";
import Tourney from "../infra/typeorm/entities/Tourney";

@injectable()
class ListTourneyService {
  constructor(
    @inject("TourneysRepository")
    private tourneyRepository: ITourneyRepository,
  ) {}
  public async execute(): Promise<Tourney[]> {
    const tourneys = await this.tourneyRepository.find();

    return tourneys;
  }
}

export default ListTourneyService;
