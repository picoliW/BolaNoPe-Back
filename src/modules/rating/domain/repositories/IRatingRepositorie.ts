import Rating from "@modules/rating/infra/typeorm/entities/Rating";
import { ObjectId } from "mongodb";

export interface IRatingRepository {
  create(
    field_id: ObjectId,
    user_id: ObjectId,
    rating: number,
  ): Promise<Rating>;
  update(rating: Rating, newRatingValue: number): Promise<Rating>;
  findByFieldAndUser(
    field_id: ObjectId,
    user_id: ObjectId,
  ): Promise<Rating | null>;
  calculateAverageRating(field_id: ObjectId): Promise<number>;
  findById(rating_id: ObjectId): Promise<Rating | null>;
}
