import { ObjectId } from "mongodb";

export interface IUpdateComment {
  comment_id: ObjectId;
  user_id: ObjectId;
  new_comment: string;
}
