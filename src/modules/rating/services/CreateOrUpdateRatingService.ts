import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import RatingRepository from "../infra/typeorm/repositories/RatingRepository";
import Rating from "../infra/typeorm/entities/Rating";

@injectable()
class CreateOrUpdateRatingService {
  constructor(
    @inject("RatingsRepository")
    private ratingRepository: RatingRepository,
  ) {}

  public async execute(
    field_id: ObjectId,
    user_id: ObjectId,
    ratingValue: number,
  ): Promise<Rating> {
    let rating = await this.ratingRepository.findByFieldAndUser(
      field_id,
      user_id,
    );

    if (rating) {
      rating = await this.ratingRepository.update(rating, ratingValue);
    } else {
      rating = await this.ratingRepository.create(
        field_id,
        user_id,
        ratingValue,
      );
    }

    return rating;
  }
}

export default CreateOrUpdateRatingService;
