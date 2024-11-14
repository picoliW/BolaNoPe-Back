import { Router } from "express";
import { container } from "tsyringe";
import TeamsController from "../controller/TeamController";
import { CreateTeamSchema } from "../../schemas/CreateTeamSchema";
import { UpdateTeamSchema } from "../../schemas/UpdateTeamSchema";
import ensureAuthenticated from "@shared/infra/http/middlewares/UserAuthMiddleware";
import ensureAdmin from "@shared/infra/http/middlewares/AdminAuthMiddleware";
import ensureLeaderOrAdmin from "@shared/infra/http/middlewares/LeaderOrAdminAuthMiddleware";
import multer from "multer";
import path from "path";

const teamsRouter = Router();
const teamsController = container.resolve(TeamsController);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage: storage });

teamsRouter.get(
  "/user-teams",
  ensureAuthenticated,
  teamsController.findUserTeams,
);

teamsRouter.post(
  "/",
  upload.single("file_url"),
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
