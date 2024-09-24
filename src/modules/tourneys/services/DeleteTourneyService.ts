import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";
import { ITourneyRepository } from "../domain/repositories/ITourneyRepository";
import { IDeleteTourney } from "../domain/models/IDeleteTourney";

@injectable()
class DeleteTourneyService {
  constructor(
    @inject("TourneysRepository")
    private tourneyRepository: ITourneyRepository,
  ) {}

  public async execute({ _id }: IDeleteTourney): Promise<void> {
    try {
      const tourney = await this.tourneyRepository.findById(new ObjectId(_id));

      if (!tourney) {
        throw new NotFoundError("Tourney not found");
      }

      await this.tourneyRepository.remove(tourney);
    } catch (error) {
      throw error;
    }
  }
}

export default DeleteTourneyService;
