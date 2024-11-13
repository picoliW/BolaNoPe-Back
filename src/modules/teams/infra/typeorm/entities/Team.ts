import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("Teams")
class Team {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  leader_id: string;

  @Column()
  members_id: string[];

  @Column()
  tourneys_id: string[];

  @Column()
  file_url: string;
}

export default Team;
