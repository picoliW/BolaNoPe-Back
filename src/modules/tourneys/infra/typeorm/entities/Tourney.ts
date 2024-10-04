import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("tourneys")
class Tourney {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  prize: string;

  @Column()
  id_teams: string[];

  @Column()
  id_winner_team: string;

  @Column()
  date_from: string;

  @Column()
  date_until: string;
}

export default Tourney;
