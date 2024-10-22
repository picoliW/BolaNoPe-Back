import ensureAuthenticated from "@shared/infra/http/middlewares/UserAuthMiddleware";
import { Router } from "express";
import CommentController from "../controller/CommentController";
import ensureLeaderOrAdmin from "@shared/infra/http/middlewares/LeaderOrAdminAuthMiddleware";

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.post("/", ensureAuthenticated, commentController.create);

commentRouter.get(
  "/team/:team_id",
  ensureAuthenticated,
  commentController.listByTeam,
);

commentRouter.put("/", ensureAuthenticated, commentController.update);

commentRouter.delete(
  "/:comment_id",
  ensureAuthenticated,
  commentController.delete,
);

export default commentRouter;
