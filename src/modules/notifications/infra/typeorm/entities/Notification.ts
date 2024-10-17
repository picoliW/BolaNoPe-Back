import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("notifications")
class Notification {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ default: false })
  read: boolean;
}

export default Notification;
