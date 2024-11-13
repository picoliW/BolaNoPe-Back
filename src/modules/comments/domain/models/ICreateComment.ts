import { ObjectId } from "mongodb";

export interface ICreateComment {
  team_id?: ObjectId;
  field_id?: ObjectId;
  user_id: ObjectId;
  comment: string;
}
