import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { ITourneyRepository } from "../domain/repositories/ITourneyRepository";
import Tourney from "../infra/typeorm/entities/Tourney";

@injectable()
class ShowOneTourneyService {
  constructor(
    @inject("TourneysRepository")
    private tourneysRepository: ITourneyRepository,
  ) {}

  public async execute(_id: ObjectId): Promise<Tourney | null> {
    const tourney = await this.tourneysRepository.findById(new ObjectId(_id));

    return tourney;
  }
}

export default ShowOneTourneyService;
