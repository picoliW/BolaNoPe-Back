import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import RatingRepository from "../infra/typeorm/repositories/RatingRepository";

@injectable()
class GetAverageRatingService {
  constructor(
    @inject("RatingsRepository")
    private ratingRepository: RatingRepository,
  ) {}

  public async execute(field_id: ObjectId): Promise<number> {
    return this.ratingRepository.calculateAverageRating(field_id);
  }
}

export default GetAverageRatingService;
