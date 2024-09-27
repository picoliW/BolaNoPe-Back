import { Router } from "express";
import { container } from "tsyringe";
import multer from "multer";
import path from "path";
import express from "express";
import FieldsController from "../controller/FieldController";
import { CreateFieldSchema } from "../../schemas/CreateFieldSchema";
import ensureAdmin from "@shared/infra/http/middlewares/AdminAuthMiddleware";
import ensureAuthenticated from "@shared/infra/http/middlewares/UserAuthMiddleware";
import { UpdateFieldSchema } from "../../schemas/UpdateFieldSchema";
import { validateObjectIdMIddleware } from "@shared/infra/http/middlewares/ValidateObjectIdMiddleware";

const fieldsRouter = Router();
const fieldsController = container.resolve(FieldsController);

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

fieldsRouter.get("/", fieldsController.index);

fieldsRouter.post(
  "/",
  upload.single("file_url"),
  CreateFieldSchema,
  ensureAuthenticated,
  ensureAdmin,
  fieldsController.create,
);

fieldsRouter.put(
  "/:id",
  upload.single("file_url"),
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

fieldsRouter.use(
  "/uploads",
  express.static(path.resolve(__dirname, "..", "..", "uploads")),
);

export default fieldsRouter;
