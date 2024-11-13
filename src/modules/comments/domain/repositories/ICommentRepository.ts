import Comment from "@modules/comments/infra/typeorm/entities/Comment";
import { ObjectId } from "mongodb";
import { ICreateComment } from "../models/ICreateComment";

export interface ICommentRepository {
  create(data: ICreateComment): Promise<Comment>;
  save(comment: Comment): Promise<Comment>;
  findById(id: ObjectId): Promise<Comment | null>;
  findByTeamId(team_id: ObjectId): Promise<Comment[]>;
  remove(comment: Comment): Promise<void>;
  findByFieldId(field_id: ObjectId): Promise<Comment[]>;
}
