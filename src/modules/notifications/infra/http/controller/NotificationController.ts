import { Request, Response } from "express";
import { container } from "tsyringe";
import NotificationService from "@modules/notifications/services/NotificationService";
import { ObjectId } from "mongodb";

export default class NotificationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { userId, title, message } = req.body;

    const notificationService = container.resolve(NotificationService);

    const notification = await notificationService.createNotification(
      userId,
      title,
      message,
    );

    return res.status(201).json(notification);
  }

  public async markAsRead(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const notificationService = container.resolve(NotificationService);

    const objectId = new ObjectId(id);
    const notification = await notificationService.markAsRead(objectId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.json(notification);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const notificationService = container.resolve(NotificationService);

    const notifications =
      await notificationService.getNotificationsByUserId(userId);

    return res.json(notifications);
  }
}
