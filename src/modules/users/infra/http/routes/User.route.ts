import { Router } from "express";
import { container } from "tsyringe";
import UsersController from "../controller/UserController";
import { CreateUserSchema } from "../../schemas/CreateUserSchema";
import CPFValidator from "@shared/infra/http/middlewares/CPFValidator";
import { validateObjectIdMIddleware } from "@shared/infra/http/middlewares/ValidateObjectIdMiddleware";
import { UpdateUserSchema } from "../../schemas/UpdateUserSchema";

const usersRouter = Router();
const usersController = container.resolve(UsersController);

usersRouter.post("/", CreateUserSchema, CPFValidator, usersController.create);
usersRouter.get("/", usersController.index);
usersRouter.delete("/:id", validateObjectIdMIddleware, usersController.delete);
usersRouter.get("/:id", validateObjectIdMIddleware, usersController.show);
usersRouter.put(
  "/:id",
  UpdateUserSchema,
  validateObjectIdMIddleware,
  CPFValidator,
  usersController.update,
);

export default usersRouter;
