import { Router } from "express";
import { container } from "tsyringe";
import FieldsController from "../controller/FieldController";
import { CreateFieldSchema } from "../../schemas/CreateFieldSchema";
import ensureAdmin from "@shared/infra/http/middlewares/AdminAuthMiddleware";
import ensureAuthenticated from "@shared/infra/http/middlewares/UserAuthMiddleware";
import { UpdateFieldSchema } from "../../schemas/UpdateFieldSchema";
import { validateObjectIdMIddleware } from "@shared/infra/http/middlewares/ValidateObjectIdMiddleware";

const fieldsRouter = Router();
const fieldsController = container.resolve(FieldsController);

fieldsRouter.get("/", fieldsController.index);

fieldsRouter.post(
  "/",
  CreateFieldSchema,
  ensureAuthenticated,
  ensureAdmin,
  fieldsController.create,
);

fieldsRouter.put(
  "/:id",
  validateObjectIdMIddleware,
  UpdateFieldSchema,
  ensureAuthenticated,
  ensureAdmin,
  fieldsController.update,
);

fieldsRouter.delete(
  "/:id",
  validateObjectIdMIddleware,
  ensureAuthenticated,
  ensureAdmin,
  fieldsController.delete,
);

fieldsRouter.get("/:id", validateObjectIdMIddleware, fieldsController.show);

export default fieldsRouter;
