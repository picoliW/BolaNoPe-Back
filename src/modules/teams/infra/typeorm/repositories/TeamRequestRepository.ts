import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import TeamRequest from "../entities/TeamRequest";
import { ObjectId } from "mongodb";

class TeamRequestRepository {
  private ormRepository: Repository<TeamRequest>;

  constructor() {
    this.ormRepository = dataSource.getRepository(TeamRequest);
  }

  public async create(data: Omit<TeamRequest, "_id">): Promise<TeamRequest> {
    const request = this.ormRepository.create(data);
    await this.ormRepository.save(request);
    return request;
  }

  public async save(request: TeamRequest): Promise<TeamRequest> {
    await this.ormRepository.save(request);
    return request;
  }

  public async findById(id: ObjectId): Promise<TeamRequest | null> {
    return this.ormRepository.findOne({ where: { _id: id } });
  }

  public async findByTeamAndUser(
    teamId: string,
    userId: string,
  ): Promise<TeamRequest | null> {
    return this.ormRepository.findOne({
      where: { team_id: teamId, user_id: userId, status: "pending" },
    });
  }

  public async findByTeamId(teamId: string): Promise<TeamRequest[]> {
    return this.ormRepository.find({
      where: { team_id: teamId },
    });
  }
}

export default TeamRequestRepository;
