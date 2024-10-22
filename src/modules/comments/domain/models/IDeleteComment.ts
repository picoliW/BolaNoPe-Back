import { ObjectId } from "mongodb";

export interface IDeleteComment {
  comment_id: ObjectId;
  user_id: ObjectId;
}
