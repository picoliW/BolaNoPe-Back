import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("fields")
class Field {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  value_hour: string;

  @Column()
  obs: string;

  @Column()
  days: string;

  @Column()
  schedules: string;

  @Column()
  available: boolean;
}

export default Field;
