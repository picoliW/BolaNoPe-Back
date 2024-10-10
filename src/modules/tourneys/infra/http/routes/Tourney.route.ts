import { Router } from "express";
import { container } from "tsyringe";
import TourneysController from "../controller/TourneyController";
import { CreateTourneySchema } from "../../schemas/CreateTorneySchema";
import { UpdateTourneySchema } from "../../schemas/UpdateTourneySchema";

const tourneysRouter = Router();
const tourneysController = container.resolve(TourneysController);

tourneysRouter.post("/", CreateTourneySchema, tourneysController.create);

tourneysRouter.get("/", tourneysController.index);

tourneysRouter.delete("/:id", tourneysController.delete);

tourneysRouter.get("/:id", tourneysController.show);

tourneysRouter.put("/:id", UpdateTourneySchema, tourneysController.update);

tourneysRouter.post("/:id/addteam", tourneysController.addTeam);

export default tourneysRouter;
