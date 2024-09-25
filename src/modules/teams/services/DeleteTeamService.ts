import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import { IDeleteTeam } from "../domain/models/IDeleteTeam";

@injectable()
class DeleteTeamService {
  constructor(
    @inject("TeamsRepository")
    private teamRepository: ITeamRepository,
  ) {}

  public async execute({ _id }: IDeleteTeam): Promise<void> {
    try {
      const team = await this.teamRepository.findById(new ObjectId(_id));

      if (!team) {
        throw new NotFoundError("Team not found");
      }

      await this.teamRepository.remove(team);
    } catch (error) {
      throw error;
    }
  }
}

export default DeleteTeamService;
