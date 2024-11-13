import { Router } from "express";
import ensureAuthenticated from "@shared/infra/http/middlewares/UserAuthMiddleware";
import RatingController from "../controller/RatingController";
import { CreateTourneySchema } from "@modules/tourneys/infra/schemas/CreateTorneySchema";
import { CreateRatingSchema } from "../../schemas/CreateRatingSchema";

const ratingRouter = Router();
const ratingController = new RatingController();

ratingRouter.post(
  "/",
  ensureAuthenticated,
  CreateRatingSchema,
  ratingController.rateField,
);

ratingRouter.get(
  "/field/:field_id",
  ensureAuthenticated,
  CreateRatingSchema,
  ratingController.getAverageRating,
);

export default ratingRouter;
