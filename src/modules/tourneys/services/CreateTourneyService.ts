import { inject, injectable } from "tsyringe";
import { ITourneyRepository } from "../domain/repositories/ITourneyRepository";
import Tourney from "../infra/typeorm/entities/Tourney";
import { ICreateTourney } from "../domain/models/ICreateTourney";

@injectable()
class CreateTourneyService {
  constructor(
    @inject("TourneysRepository")
    private tourneysRepository: ITourneyRepository,
  ) {}

  public async execute({
    name,
    description,
    prize,
    id_teams,
  }: ICreateTourney): Promise<Tourney> {
    const tourney = await this.tourneysRepository.create({
      name,
      description,
      prize,
      id_teams,
    });

    await this.tourneysRepository.save(tourney);

    return tourney;
  }
}

export default CreateTourneyService;