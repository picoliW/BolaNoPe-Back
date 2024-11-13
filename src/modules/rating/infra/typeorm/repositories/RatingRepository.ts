// src/modules/ratings/repositories/RatingRepository.ts
import { Repository } from "typeorm";
import { ObjectId } from "mongodb";
import Rating from "../entities/Rating";
import { dataSource } from "@shared/infra/typeorm";

class RatingRepository {
  private ormRepository: Repository<Rating>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Rating);
  }

  public async create(
    field_id: ObjectId,
    user_id: ObjectId,
    rating: number,
  ): Promise<Rating> {
    const newRating = this.ormRepository.create({
      field_id,
      user_id,
      rating,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.ormRepository.save(newRating);
    return newRating;
  }

  public async update(rating: Rating, newRatingValue: number): Promise<Rating> {
    rating.rating = newRatingValue;
    rating.updated_at = new Date();
    return this.ormRepository.save(rating);
  }

  public async findByFieldAndUser(
    field_id: ObjectId,
    user_id: ObjectId,
  ): Promise<Rating | null> {
    return this.ormRepository.findOne({ where: { field_id, user_id } });
  }

  public async calculateAverageRating(field_id: ObjectId): Promise<number> {
    const ratings = await this.ormRepository.find({ where: { field_id } });
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return totalRatings ? sumRatings / totalRatings : 0;
  }
}

export default RatingRepository;
