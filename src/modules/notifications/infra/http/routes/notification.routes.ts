import { Router } from "express";
import NotificationController from "../controller/NotificationController";

const notificationRouter = Router();
const notificationController = new NotificationController();

notificationRouter.post("/", notificationController.create);

notificationRouter.put("/:id/read", notificationController.markAsRead);

notificationRouter.get("/user/:userId", notificationController.list);

export default notificationRouter;
