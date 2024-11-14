import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import RatingRepository from "../infra/typeorm/repositories/RatingRepository";
import CommentRepository from "@modules/comments/infra/typeorm/repositories/CommentRepository";
import Comment from "@modules/comments/infra/typeorm/entities/Comment";
import { IRatingWithComment } from "../domain/models/IRatingWithComment";

@injectable()
class GetRatingWithCommentService {
  constructor(
    @inject("RatingsRepository")
    private ratingRepository: RatingRepository,

    @inject("CommentsRepository")
    private commentRepository: CommentRepository,
  ) {}

  public async execute(rating_id: ObjectId): Promise<IRatingWithComment> {
    const rating = await this.ratingRepository.findById(rating_id);

    if (!rating) {
      throw new Error("Rating not found");
    }

    let comment: Comment | undefined;
    if (rating.comment_id) {
      comment =
        (await this.commentRepository.findById(rating.comment_id)) || undefined;
    }

    return { rating, comment };
  }
}

export default GetRatingWithCommentService;
