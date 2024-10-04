import { inject, injectable } from "tsyringe";
import { ITeamRequestRepository } from "../domain/repositories/ITeamRequestRepository";
import { NotFoundError } from "@shared/errors/NotFoundError";
import TeamRequest from "../infra/typeorm/entities/TeamRequest";

@injectable()
class CheckTeamRequestService {
  constructor(
    @inject("TeamRequestRepository")
    private teamRequestRepository: ITeamRequestRepository,
  ) {}

  public async execute(teamId: string, userId: string): Promise<boolean> {
    const existingRequest = await this.teamRequestRepository.findByTeamAndUser(
      teamId,
      userId,
    );

    if (!existingRequest) {
      throw new NotFoundError(
        "Nenhuma solicitação encontrada para este time e usuário.",
      );
    }

    return true;
  }
}

export default CheckTeamRequestService;
