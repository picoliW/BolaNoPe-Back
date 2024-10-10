import { inject, injectable } from "tsyringe";
import { ITeamRequestRepository } from "../domain/repositories/ITeamRequestRepository";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";

@injectable()
class CountPendingRequestsService {
  constructor(
    @inject("TeamRequestRepository")
    private teamRequestRepository: ITeamRequestRepository,
  ) {}

  public async execute(teamId: string): Promise<number> {
    const requests = await this.teamRequestRepository.findByTeamId(teamId);

    if (!requests || requests.length === 0) {
      throw new NotFoundError("Nenhuma solicitação encontrada para o time.");
    }

    const pendingRequests = requests.filter(
      request => request.status === "pending",
    );

    return pendingRequests.length;
  }
}

export default CountPendingRequestsService;
