import { Router } from "express";
import { container } from "tsyringe";
import TeamsController from "../controller/TeamController";
import { CreateTeamSchema } from "../../schemas/CreateTeamSchema";
import { UpdateTeamSchema } from "../../schemas/UpdateTeamSchema";
import ensureAuthenticated from "@shared/infra/http/middlewares/UserAuthMiddleware";
import ensureAdmin from "@shared/infra/http/middlewares/AdminAuthMiddleware";
import ensureLeaderOrAdmin from "@shared/infra/http/middlewares/LeaderOrAdminAuthMiddleware";

const teamsRouter = Router();
const teamsController = container.resolve(TeamsController);

teamsRouter.post(
  "/",
  ensureAuthenticated,
  CreateTeamSchema,
  teamsController.create,
);

teamsRouter.get("/leader", ensureAuthenticated, teamsController.findByLeader);

teamsRouter.get("/", teamsController.index);

teamsRouter.get("/members/:memberId", teamsController.findByMemberId);

teamsRouter.delete("/:id", ensureAuthenticated, teamsController.delete);

teamsRouter.get("/:id", teamsController.show);

teamsRouter.put("/:id", UpdateTeamSchema, teamsController.update);

export default teamsRouter;
