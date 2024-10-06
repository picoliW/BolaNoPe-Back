import { Request, Response } from "express";
import { container } from "tsyringe";
import HandleTeamRequestService from "@modules/teams/services/HandleTeamRequestService";
import CreateTeamRequestService from "@modules/teams/services/CreateTemRequestService";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ConflictError } from "@shared/errors/ConflictError";
import { BadRequestError } from "@shared/errors/BadRequestError";
import ListTeamRequestsService from "@modules/teams/services/ListTeamRequestService";
import CheckTeamRequestService from "@modules/teams/services/CheckTeamRequestService";
import CountPendingRequestsService from "@modules/teams/services/CountPendingRequestsService";

export default class TeamRequestController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { teamId } = req.body;
    const userId = req.user.id;

    const createTeamRequestService = container.resolve(
      CreateTeamRequestService,
    );

    try {
      const request = await createTeamRequestService.execute(teamId, userId);
      return res.status(201).json(request);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { requestId } = req.params;
    const { action } = req.body;
    const leaderId = req.user.id;

    const handleTeamRequestService = container.resolve(
      HandleTeamRequestService,
    );
    try {
      const request = await handleTeamRequestService.execute(
        requestId,
        leaderId,
        action,
      );
      return res.status(200).json(request);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof ConflictError) {
        return res.status(409).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listByTeam(req: Request, res: Response): Promise<Response> {
    const { teamId } = req.params;

    const listTeamRequestsService = container.resolve(ListTeamRequestsService);

    try {
      const requests = await listTeamRequestsService.execute(teamId);
      return res.status(200).json(requests);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async check(req: Request, res: Response): Promise<Response> {
    const { teamId } = req.params;
    const userId = req.user.id;

    const checkTeamRequestService = container.resolve(CheckTeamRequestService);

    try {
      const hasRequest = await checkTeamRequestService.execute(teamId, userId);
      return res.status(200).json({ hasRequest });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async countPendingRequests(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { teamId } = req.params;

    const countPendingRequestsService = container.resolve(
      CountPendingRequestsService,
    );

    try {
      const pendingRequestsCount =
        await countPendingRequestsService.execute(teamId);
      return res.status(200).json({ pendingRequests: pendingRequestsCount });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
