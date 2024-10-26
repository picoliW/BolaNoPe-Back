import { inject, injectable } from "tsyringe";
import { ICommentRepository } from "@modules/comments/domain/repositories/ICommentRepository";
import { ICreateComment } from "@modules/comments/domain/models/ICreateComment";
import Comment from "@modules/comments/infra/typeorm/entities/Comment";

@injectable()
class CreateCommentService {
  constructor(
    @inject("CommentsRepository")
    private commentRepository: ICommentRepository,
  ) {}

  public async execute(data: ICreateComment): Promise<Comment> {
    const comment = await this.commentRepository.create(data);
    return comment;
  }
}

export default CreateCommentService;
