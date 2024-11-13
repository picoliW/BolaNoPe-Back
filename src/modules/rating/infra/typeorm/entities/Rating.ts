import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("Ratings")
class Rating {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  field_id: ObjectId;

  @Column()
  user_id: ObjectId;

  @Column()
  rating: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Rating;
