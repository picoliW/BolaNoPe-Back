import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("TeamRequests")
class TeamRequest {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  team_id: string;

  @Column()
  user_id: string;

  @Column()
  status: "pending" | "approved" | "rejected";

  @Column()
  requested_at: Date;

  @Column({ nullable: true })
  responded_at?: Date;
}

export default TeamRequest;
