import { Router } from "express";
import ensureAuthenticated from "@shared/infra/http/middlewares/UserAuthMiddleware";
import RatingController from "../controller/RatingController";
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

ratingRouter.get(
  "/:rating_id/comment",
  ensureAuthenticated,
  ratingController.getRatingWithComment,
);

ratingRouter.get("/", ratingController.getAllRatingsWithComments);

export default ratingRouter;
