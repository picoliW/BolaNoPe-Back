import { Request, Response } from "express";
import { container } from "tsyringe";
import { ObjectId } from "mongodb";
import CreateOrUpdateRatingService from "@modules/rating/services/CreateOrUpdateRatingService";
import GetAverageRatingService from "@modules/rating/services/GetAverageRatingService";
import GetRatingWithCommentService from "@modules/rating/services/GetRatingWithCommentService";

class RatingController {
  public async rateField(req: Request, res: Response): Promise<Response> {
    const { field_id, rating, comment_id } = req.body;
    const user_id = req.user.id;

    const createOrUpdateRating = container.resolve(CreateOrUpdateRatingService);
    const updatedRating = await createOrUpdateRating.execute(
      new ObjectId(field_id),
      new ObjectId(user_id),
      rating,
      comment_id ? new ObjectId(comment_id) : undefined,
    );

    return res.status(201).json(updatedRating);
  }

  public async getAverageRating(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { field_id } = req.params;

    const getAverageRating = container.resolve(GetAverageRatingService);
    const averageRating = await getAverageRating.execute(
      new ObjectId(field_id),
    );

    return res.json({ average_rating: averageRating });
  }

  public async getRatingWithComment(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { rating_id } = req.params;

    const getRatingWithComment = container.resolve(GetRatingWithCommentService);
    const ratingWithComment = await getRatingWithComment.execute(
      new ObjectId(rating_id),
    );

    return res.json(ratingWithComment);
  }
}

export default RatingController;
