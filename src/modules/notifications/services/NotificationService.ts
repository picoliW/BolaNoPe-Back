import { injectable, inject } from "tsyringe";
import { ObjectId } from "mongodb";
import NotificationRepository from "../infra/typeorm/repositories/NotificationRepository";

@injectable()
class NotificationService {
  constructor(
    @inject("NotificationsRepository")
    private notificationRepository: NotificationRepository,
  ) {}

  public async createNotification(
    userId: string,
    title: string,
    message: string,
  ) {
    return this.notificationRepository.create({ userId, title, message });
  }

  public async markAsRead(notificationId: ObjectId) {
    return this.notificationRepository.markAsRead(notificationId);
  }

  public async getNotificationsByUserId(userId: string) {
    return this.notificationRepository.findByUserId(userId);
  }
}

export default NotificationService;
