import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ITourneyRepository } from "../domain/repositories/ITourneyRepository";
import { IUpdateTourney } from "../domain/models/IUpdateTourney";
import Tourney from "../infra/typeorm/entities/Tourney";

@injectable()
class UpdateTourneyService {
  constructor(
    @inject("TourneysRepository")
    private tourneyRepository: ITourneyRepository,
  ) {}

  public async execute({
    _id,
    name,
    description,
    prize,
    id_teams,
  }: IUpdateTourney): Promise<Partial<Tourney>> {
    const tourney = await this.tourneyRepository.findById(new ObjectId(_id));

    if (!tourney) {
      throw new NotFoundError("Tourney not found");
    }

    const updatedTourneys: Partial<Tourney> = {};

    if (name) {
      tourney.name = name;
      updatedTourneys.name = name;
    }
    if (description) {
      tourney.description = description;
      updatedTourneys.description = description;
    }
    if (prize) {
      tourney.prize = prize;
      updatedTourneys.prize = prize;
    }
    if (id_teams) {
      tourney.id_teams = id_teams;
      updatedTourneys.id_teams = id_teams;
    }

    await this.tourneyRepository.save(tourney);

    return updatedTourneys;
  }
}

export default UpdateTourneyService;
