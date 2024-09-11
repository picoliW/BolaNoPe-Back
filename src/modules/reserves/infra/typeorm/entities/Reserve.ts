import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("reserves")
class Reserve {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id_field: string;

  @Column()
  id_user: string;

  @Column()
  start_hour: string;

  @Column()
  end_hour: string;

  @Column()
  final_value: string;
}

export default Reserve;
