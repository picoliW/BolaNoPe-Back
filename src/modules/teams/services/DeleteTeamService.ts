import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import { IDeleteTeam } from "../domain/models/IDeleteTeam";
import { UnauthorizedError } from "@shared/errors/UnauthorizedError";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";

@injectable()
class DeleteTeamService {
  constructor(
    @inject("TeamsRepository")
    private teamRepository: ITeamRepository,

    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ _id, userId }: IDeleteTeam): Promise<void> {
    try {
      const team = await this.teamRepository.findById(new ObjectId(_id));

      if (!team) {
        throw new NotFoundError("Team not found");
      }

      const user = await this.userRepository.findById(new ObjectId(userId));

      if (!user) {
        throw new NotFoundError("User not found");
      }

      if (team.leader_id.toString() !== userId && user.role !== "admin") {
        throw new UnauthorizedError(
          "Only the team leader or an admin can delete the team",
        );
      }

      await this.teamRepository.remove(team);
    } catch (error) {
      throw error;
    }
  }
}

export default DeleteTeamService;
