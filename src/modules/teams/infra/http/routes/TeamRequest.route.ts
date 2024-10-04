import { Router } from "express";
import TeamRequestController from "../controller/TeamRequestController";
import ensureAuthenticated from "@shared/infra/http/middlewares/UserAuthMiddleware";

const teamRequestsRouter = Router();
const teamRequestController = new TeamRequestController();

teamRequestsRouter.post("/", ensureAuthenticated, teamRequestController.create);

teamRequestsRouter.post(
  "/:requestId",
  ensureAuthenticated,
  teamRequestController.handle,
);

export default teamRequestsRouter;
