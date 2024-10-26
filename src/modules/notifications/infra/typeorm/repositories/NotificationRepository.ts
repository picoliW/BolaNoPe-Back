import { Repository } from "typeorm";
import Notification from "../entities/Notification";
import { dataSource } from "@shared/infra/typeorm";
import { ObjectId } from "mongodb";

class NotificationRepository {
  private ormRepository: Repository<Notification>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Notification);
  }

  public async create({
    userId,
    title,
    message,
  }: {
    userId: string;
    title: string;
    message: string;
  }): Promise<Notification> {
    const notification = this.ormRepository.create({
      userId,
      title,
      message,
      read: false,
    });

    await this.ormRepository.save(notification);
    return notification;
  }

  public async markAsRead(
    notificationId: ObjectId,
  ): Promise<Notification | null> {
    const notification = await this.ormRepository.findOne({
      where: { _id: notificationId },
    });
    if (!notification) {
      return null;
    }
    notification.read = true;
    await this.ormRepository.save(notification);
    return notification;
  }

  public async findByUserId(userId: string): Promise<Notification[]> {
    return this.ormRepository.find({ where: { userId } });
  }
}

export default NotificationRepository;
