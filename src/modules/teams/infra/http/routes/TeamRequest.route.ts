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

teamRequestsRouter.get(
  "/team/:teamId",
  ensureAuthenticated,
  teamRequestController.listByTeam,
);

teamRequestsRouter.get(
  "/check/:teamId",
  ensureAuthenticated,
  teamRequestController.check,
);

export default teamRequestsRouter;
