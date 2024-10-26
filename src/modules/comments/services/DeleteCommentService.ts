import { inject, injectable } from "tsyringe";
import { ICommentRepository } from "@modules/comments/domain/repositories/ICommentRepository";
import { IDeleteComment } from "../domain/models/IDeleteComment";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { UnauthorizedError } from "@shared/errors/UnauthorizedError";

@injectable()
class DeleteCommentService {
  constructor(
    @inject("CommentsRepository")
    private commentRepository: ICommentRepository,
  ) {}

  public async execute({ comment_id, user_id }: IDeleteComment): Promise<void> {
    const comment = await this.commentRepository.findById(comment_id);

    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    if (comment.user_id.toString() !== user_id.toString()) {
      throw new UnauthorizedError("You are not allowed to delete this comment");
    }

    await this.commentRepository.remove(comment);
  }
}

export default DeleteCommentService;
