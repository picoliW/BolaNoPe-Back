import Comment from "@modules/comments/infra/typeorm/entities/Comment";
import Rating from "@modules/rating/infra/typeorm/entities/Rating";

export interface IRatingWithComment {
  rating: Rating;
  comment?: Comment;
}
