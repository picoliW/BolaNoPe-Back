import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import RatingRepository from "../infra/typeorm/repositories/RatingRepository";
import CommentRepository from "@modules/comments/infra/typeorm/repositories/CommentRepository";
import Comment from "@modules/comments/infra/typeorm/entities/Comment";
import { IRatingWithComment } from "../domain/models/IRatingWithComment";

@injectable()
class GetAllRatingsWithCommentsService {
  constructor(
    @inject("RatingsRepository")
    private ratingRepository: RatingRepository,

    @inject("CommentsRepository")
    private commentRepository: CommentRepository,
  ) {}

  public async execute(): Promise<IRatingWithComment[]> {
    const ratings = await this.ratingRepository.findAll();

    const ratingsWithComments = await Promise.all(
      ratings.map(async rating => {
        let comment: Comment | undefined;

        if (rating.comment_id) {
          comment =
            (await this.commentRepository.findById(rating.comment_id)) ||
            undefined;
        }

        return { rating, comment };
      }),
    );

    return ratingsWithComments;
  }
}

export default GetAllRatingsWithCommentsService;
