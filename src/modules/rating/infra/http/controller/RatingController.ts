import { Request, Response } from "express";
import { container } from "tsyringe";
import { ObjectId } from "mongodb";
import CreateOrUpdateRatingService from "@modules/rating/services/CreateOrUpdateRatingService";
import GetAverageRatingService from "@modules/rating/services/GetAverageRatingService";

class RatingController {
  public async rateField(req: Request, res: Response): Promise<Response> {
    const { field_id, rating } = req.body;
    const user_id = req.user.id;

    const createOrUpdateRating = container.resolve(CreateOrUpdateRatingService);
    const updatedRating = await createOrUpdateRating.execute(
      new ObjectId(field_id),
      new ObjectId(user_id),
      rating,
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
}

export default RatingController;
