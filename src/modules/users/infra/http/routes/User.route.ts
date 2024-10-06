import { Router } from "express";
import { container } from "tsyringe";
import UsersController from "../controller/UserController";
import { CreateUserSchema } from "../../schemas/CreateUserSchema";
import CPFValidator from "@shared/infra/http/middlewares/CPFValidator";
import { validateObjectIdMIddleware } from "@shared/infra/http/middlewares/ValidateObjectIdMiddleware";
import { UpdateUserSchema } from "../../schemas/UpdateUserSchema";
import multer from "multer";
import path from "path";

const usersRouter = Router();
const usersController = container.resolve(UsersController);

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

usersRouter.post("/", upload.single("file_url"), CreateUserSchema, CPFValidator, usersController.create);
usersRouter.get("/", usersController.index);
usersRouter.delete("/:id", validateObjectIdMIddleware, usersController.delete);
usersRouter.get("/:id", validateObjectIdMIddleware, usersController.show);
usersRouter.put(
  "/:id",
  upload.single("file_url"),
  UpdateUserSchema,
  validateObjectIdMIddleware,
  CPFValidator,
  usersController.update,
);

export default usersRouter;
