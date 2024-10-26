import { Router } from "express";
import { container } from "tsyringe";
import StudentsController from "../controller/StudentController";

const studentsRouter = Router();
const studentsController = container.resolve(StudentsController);

studentsRouter.post("/", studentsController.create);

export default studentsRouter;
