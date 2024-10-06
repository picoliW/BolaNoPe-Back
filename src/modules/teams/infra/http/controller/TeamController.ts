import { Request, Response } from "express";
import { container } from "tsyringe";
import { ObjectId } from "mongodb";
import { ConflictError } from "@shared/errors/ConflictError";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { BadRequestError } from "@shared/errors/BadRequestError";
import ListTeamService from "@modules/teams/services/ListTeamService";
import CreateTeamService from "@modules/teams/services/CreateTeamService";
import DeleteTeamService from "@modules/teams/services/DeleteTeamService";
import ShowOneTeamService from "@modules/teams/services/ShowOneTeamService";
import UpdateTeamService from "@modules/teams/services/UpdateTeamService";
import { UnauthorizedError } from "@shared/errors/UnauthorizedError";
import TeamsRepository from "../../typeorm/repositories/TeamRepositoy";
import ListTeamsByLeaderService from "@modules/teams/services/ListTeamsByLeaderService";

export default class TeamsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listTeam = container.resolve(ListTeamService);

    const teams = await listTeam.execute();

    return res.json(teams);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, leader_id, description, members_id, tourneys_id } =
      request.body;

    const loggedInUserId = request.user.id;

    const createTeam = container.resolve(CreateTeamService);

    try {
      const team = await createTeam.execute(
        {
          name,
          description,
          leader_id,
          members_id,
          tourneys_id,
        },
        loggedInUserId,
      );

      return response.status(201).json(team);
    } catch (error) {
      if (error instanceof ConflictError) {
        return response.status(409).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return response.status(400).json({ message: error.message });
      }
      throw error;
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteTeam = container.resolve(DeleteTeamService);

    try {
      const objectId = new ObjectId(id);
      const userId = req.user.id;
      await deleteTeam.execute({ _id: objectId, userId });

      return res.status(204).json();
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(404).json({ message: error.message });
      }

      throw error;
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showTeam = container.resolve(ShowOneTeamService);
    const objectId = new ObjectId(id);
    const team = await showTeam.execute(objectId);

    if (!team) {
      return res.status(404).json({ error: "Tourney not found" });
    }

    return res.json(team);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, leader_id, members_id, tourneys_id } = req.body;

    const updateTeamService = container.resolve(UpdateTeamService);
    const objectId = new ObjectId(id);

    try {
      const updatedTeams = await updateTeamService.execute({
        _id: objectId,
        name,
        description,
        leader_id,
        members_id,
        tourneys_id,
      });

      return res.status(200).json(updatedTeams);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof ConflictError) {
        return res.status(409).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return res.status(400).json({ message: error.message });
      }
      throw error;
    }
  }

  public async findByMemberId(req: Request, res: Response): Promise<Response> {
    const { memberId } = req.params;

    const objectId = new ObjectId(memberId);

    const teamsRepository = container.resolve(TeamsRepository);

    const teams = await teamsRepository.findByMemberId(objectId);

    return res.json(teams);
  }

  public async findByLeader(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const listTeamsByLeader = container.resolve(ListTeamsByLeaderService);

    const teams = await listTeamsByLeader.execute(userId);

    return res.json(teams);
  }
}
