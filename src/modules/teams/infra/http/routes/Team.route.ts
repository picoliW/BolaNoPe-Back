import { Router } from "express";
import { container } from "tsyringe";
import TeamsController from "../controller/TeamController";
import { CreateTeamSchema } from "../../schemas/CreateTeamSchema";
import { UpdateTeamSchema } from "../../schemas/UpdateTeamSchema";
import ensureAuthenticated from "@shared/infra/http/middlewares/UserAuthMiddleware";

const teamsRouter = Router();
const teamsController = container.resolve(TeamsController);

teamsRouter.post(
  "/",
  ensureAuthenticated,
  CreateTeamSchema,
  teamsController.create,
);

teamsRouter.get("/", teamsController.index);

teamsRouter.delete("/:id", ensureAuthenticated, teamsController.delete);

teamsRouter.get("/:id", teamsController.show);

teamsRouter.put("/:id", UpdateTeamSchema, teamsController.update);

export default teamsRouter;
