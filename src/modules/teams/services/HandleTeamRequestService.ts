import { inject, injectable } from "tsyringe";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { UnauthorizedError } from "@shared/errors/UnauthorizedError";
import TeamRequest from "../infra/typeorm/entities/TeamRequest";
import { ObjectId } from "mongodb";
import { ITeamRequestRepository } from "../domain/repositories/ITeamRequestRepository";

@injectable()
class HandleTeamRequestService {
  constructor(
    @inject("TeamRequestRepository")
    private teamRequestRepository: ITeamRequestRepository,

    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(
    requestId: string,
    leaderId: string,
    action: "approve" | "reject",
  ): Promise<TeamRequest> {
    const request = await this.teamRequestRepository.findById(
      new ObjectId(requestId),
    );

    if (!request) {
      throw new NotFoundError("Solicitação não encontrada.");
    }

    const team = await this.teamsRepository.findById(
      new ObjectId(request.team_id),
    );

    if (!team || team.leader_id !== leaderId) {
      throw new UnauthorizedError("Apenas o líder do time pode responder.");
    }

    request.status = action === "approve" ? "approved" : "rejected";
    request.responded_at = new Date();

    await this.teamRequestRepository.save(request);

    if (action === "approve") {
      team.members_id.push(request.user_id);
      await this.teamsRepository.save(team);
    }

    return request;
  }
}

export default HandleTeamRequestService;
