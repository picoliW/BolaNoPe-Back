// ListCommentByFieldService.ts
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { ICommentRepository } from "@modules/comments/domain/repositories/ICommentRepository";
import Comment from "../infra/typeorm/entities/Comment";

@injectable()
class ListCommentsByFieldService {
  constructor(
    @inject("CommentsRepository")
    private commentRepository: ICommentRepository,
  ) {}

  public async execute(field_id: ObjectId): Promise<Comment[]> {
    return this.commentRepository.findByFieldId(field_id);
  }
}

export default ListCommentsByFieldService;
