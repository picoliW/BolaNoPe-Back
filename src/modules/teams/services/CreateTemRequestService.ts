import { inject, injectable } from "tsyringe";

import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import { NotFoundError } from "@shared/errors/NotFoundError";
import TeamRequest from "../infra/typeorm/entities/TeamRequest";
import { ObjectId } from "mongodb";
import { ITeamRequestRepository } from "../domain/repositories/ITeamRequestRepository";
import { BadRequestError } from "@shared/errors/BadRequestError";

@injectable()
class CreateTeamRequestService {
  constructor(
    @inject("TeamRequestRepository")
    private teamRequestRepository: ITeamRequestRepository,

    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(teamId: string, userId: string): Promise<TeamRequest> {
    const team = await this.teamsRepository.findById(new ObjectId(teamId));

    if (!team) {
      throw new NotFoundError("Time não encontrado.");
    }

    const existingRequest = await this.teamRequestRepository.findByTeamAndUser(
      teamId,
      userId,
    );

    if (existingRequest) {
      throw new BadRequestError("Solicitação já enviada.");
    }

    const request = await this.teamRequestRepository.create({
      team_id: teamId,
      user_id: userId,
      status: "pending",
      requested_at: new Date(),
    });

    return request;
  }
}

export default CreateTeamRequestService;
