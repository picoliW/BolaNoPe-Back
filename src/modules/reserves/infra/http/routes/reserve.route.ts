import { Router } from "express";
import { container } from "tsyringe";
import ReserveController from "../controller/ReserveController";
import { validateCreateReserve } from "../../schemas/CreateReserveValidator";
import { validateObjectIdMIddleware } from "@shared/infra/http/middlewares/ValidateObjectIdMiddleware";
import { validateUpdateReserve } from "../../schemas/UpdateReserveValidator";

const reserveRouter = Router();
const reserveController = container.resolve(ReserveController);

reserveRouter.post("/", validateCreateReserve, reserveController.create);

reserveRouter.get("/", reserveController.index);

reserveRouter.get("/:id", validateObjectIdMIddleware, reserveController.show);

reserveRouter.put(
  "/:id",
  validateUpdateReserve,
  validateObjectIdMIddleware,
  reserveController.update,
);

reserveRouter.delete(
  "/:id",
  validateObjectIdMIddleware,
  reserveController.delete,
);

reserveRouter.get("/field/:id_field", reserveController.listByField);

export default reserveRouter;
