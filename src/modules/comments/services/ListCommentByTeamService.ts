import { inject, injectable } from "tsyringe";
import Comment from "@modules/comments/infra/typeorm/entities/Comment";
import { ICommentRepository } from "@modules/comments/domain/repositories/ICommentRepository";
import { ObjectId } from "mongodb";

@injectable()
class ListCommentsByTeamService {
  constructor(
    @inject("CommentsRepository")
    private commentRepository: ICommentRepository,
  ) {}

  public async execute(team_id: ObjectId): Promise<Comment[]> {
    return this.commentRepository.findByTeamId(team_id);
  }
}

export default ListCommentsByTeamService;
