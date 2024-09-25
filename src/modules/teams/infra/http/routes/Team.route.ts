import { Router } from "express";
import { container } from "tsyringe";
import TeamsController from "../controller/TeamController";
import { CreateTeamSchema } from "../../schemas/CreateTeamSchema";
import { UpdateTeamSchema } from "../../schemas/UpdateTeamSchema";

const teamsRouter = Router();
const teamsController = container.resolve(TeamsController);

teamsRouter.post("/", CreateTeamSchema, teamsController.create);

teamsRouter.get("/", teamsController.index);

teamsRouter.delete("/:id", teamsController.delete);

teamsRouter.get("/:id", teamsController.show);

teamsRouter.put("/:id", UpdateTeamSchema, teamsController.update);

export default teamsRouter;
