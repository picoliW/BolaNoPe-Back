import { Request, Response } from "express";
import { container } from "tsyringe";
import HandleTeamRequestService from "@modules/teams/services/HandleTeamRequestService";
import CreateTeamRequestService from "@modules/teams/services/CreateTemRequestService";

export default class TeamRequestController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { teamId } = req.body;
    const userId = req.user.id;

    const createTeamRequestService = container.resolve(
      CreateTeamRequestService,
    );

    const request = await createTeamRequestService.execute(teamId, userId);

    return res.status(201).json(request);
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { requestId } = req.params;
    const { action } = req.body;
    const leaderId = req.user.id;

    const handleTeamRequestService = container.resolve(
      HandleTeamRequestService,
    );

    const request = await handleTeamRequestService.execute(
      requestId,
      leaderId,
      action,
    );

    return res.status(200).json(request);
  }
}
