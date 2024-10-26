import { inject, injectable } from "tsyringe";
import { ICommentRepository } from "@modules/comments/domain/repositories/ICommentRepository";
import Comment from "@modules/comments/infra/typeorm/entities/Comment";
import { IUpdateComment } from "../domain/models/IUpdateComment";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { UnauthorizedError } from "@shared/errors/UnauthorizedError";

@injectable()
class UpdateCommentService {
  constructor(
    @inject("CommentsRepository")
    private commentRepository: ICommentRepository,
  ) {}

  public async execute({
    comment_id,
    user_id,
    new_comment,
  }: IUpdateComment): Promise<Comment> {
    const comment = await this.commentRepository.findById(comment_id);

    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    if (comment.user_id.toString() !== user_id.toString()) {
      throw new UnauthorizedError("You are not allowed to edit this comment");
    }

    comment.comment = new_comment;
    return this.commentRepository.save(comment);
  }
}

export default UpdateCommentService;
