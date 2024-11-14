import { Router } from "express";
import { container } from "tsyringe";
import TourneysController from "../controller/TourneyController";
import { CreateTourneySchema } from "../../schemas/CreateTorneySchema";
import { UpdateTourneySchema } from "../../schemas/UpdateTourneySchema";
import { validateObjectIdMIddleware } from "@shared/infra/http/middlewares/ValidateObjectIdMiddleware";

const tourneysRouter = Router();
const tourneysController = container.resolve(TourneysController);

tourneysRouter.get(
  "/average-participants",
  tourneysController.getAverageParticipants,
);

tourneysRouter.post("/", CreateTourneySchema, tourneysController.create);

tourneysRouter.get("/", tourneysController.index);

tourneysRouter.delete("/:id", tourneysController.delete);

tourneysRouter.get("/:id", tourneysController.show);

tourneysRouter.put("/:id", UpdateTourneySchema, tourneysController.update);

tourneysRouter.post("/:id/addteam", tourneysController.addTeam);

tourneysRouter.delete(
  "/:id/removeteam",
  validateObjectIdMIddleware,
  tourneysController.removeTeam,
);

tourneysRouter.get("/:id/teams", tourneysController.listTeams);

export default tourneysRouter;
