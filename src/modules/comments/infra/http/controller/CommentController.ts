import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCommentService from "@modules/comments/services/CreateCommentService";
import DeleteCommentService from "@modules/comments/services/DeleteCommentService";
import { ObjectId } from "mongodb";
import ListCommentsByTeamService from "@modules/comments/services/ListCommentByTeamService";
import UpdateCommentService from "@modules/comments/services/UpdateCommentService";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { UnauthorizedError } from "@shared/errors/UnauthorizedError";

export default class CommentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { team_id, comment } = req.body;
    const user_id = req.user.id;

    const createComment = container.resolve(CreateCommentService);
    const createdComment = await createComment.execute({
      team_id: new ObjectId(team_id),
      user_id: new ObjectId(user_id),
      comment,
    });

    return res.status(201).json(createdComment);
  }

  public async listByTeam(req: Request, res: Response): Promise<Response> {
    const { team_id } = req.params;

    const listComments = container.resolve(ListCommentsByTeamService);
    const comments = await listComments.execute(new ObjectId(team_id));

    return res.json(comments);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { comment_id, comment } = req.body;
      const user_id = req.user.id;

      const updateComment = container.resolve(UpdateCommentService);
      const updatedComment = await updateComment.execute({
        comment_id: new ObjectId(comment_id),
        user_id: new ObjectId(user_id),
        new_comment: comment,
      });

      return res.json(updatedComment);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof UnauthorizedError) {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: "internal Server Error" });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { comment_id } = req.params;
      const user_id = req.user.id;

      const deleteComment = container.resolve(DeleteCommentService);
      await deleteComment.execute({
        comment_id: new ObjectId(comment_id),
        user_id: new ObjectId(user_id),
      });

      return res.status(204).send();
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof UnauthorizedError) {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: "internal Server Error" });
    }
  }
}
