import { Repository } from "typeorm";
import { ObjectId } from "mongodb";
import Comment from "../entities/Comment";
import { ICommentRepository } from "@modules/comments/domain/repositories/ICommentRepository";
import { dataSource } from "@shared/infra/typeorm";
import { ICreateComment } from "@modules/comments/domain/models/ICreateComment";

class CommentRepository implements ICommentRepository {
  private ormRepository: Repository<Comment>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Comment);
  }

  public async create({
    team_id,
    field_id,
    user_id,
    comment,
  }: ICreateComment): Promise<Comment> {
    const newComment = this.ormRepository.create({
      team_id,
      field_id,
      user_id,
      comment,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.ormRepository.save(newComment);
    return newComment;
  }

  public async save(comment: Comment): Promise<Comment> {
    comment.updated_at = new Date();
    return this.ormRepository.save(comment);
  }

  public async findById(id: ObjectId): Promise<Comment | null> {
    return this.ormRepository.findOne({ where: { _id: id } });
  }

  public async findByFieldId(field_id: ObjectId): Promise<Comment[]> {
    return this.ormRepository.find({ where: { field_id } });
  }

  public async findByTeamId(team_id: ObjectId): Promise<Comment[]> {
    return this.ormRepository.find({ where: { team_id } });
  }

  public async remove(comment: Comment): Promise<void> {
    await this.ormRepository.remove(comment);
  }
}

export default CommentRepository;
