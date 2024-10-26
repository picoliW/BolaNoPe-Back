import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("Comments")
class Comment {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  team_id: ObjectId;

  @Column()
  user_id: ObjectId;

  @Column()
  comment: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Comment;
