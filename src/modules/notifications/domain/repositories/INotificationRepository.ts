import Notification from "@modules/notifications/infra/typeorm/entities/Notification";
import { ObjectId } from "mongodb";

export interface INotificationRepository {
  create({
    userId,
    title,
    message,
  }: {
    userId: string;
    title: string;
    message: string;
  }): Promise<Notification>;
  markAsRead(notificationId: ObjectId): Promise<Notification | null>;
  findByUserId(userId: string): Promise<Notification[]>;
}
