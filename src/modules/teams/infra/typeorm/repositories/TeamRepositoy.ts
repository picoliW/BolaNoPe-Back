import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { ObjectId } from "mongodb";
import { ITeamRepository } from "@modules/teams/domain/repositories/ITeamRepository";
import Team from "../entities/Team";
import { ICreateTeam } from "@modules/teams/domain/models/ICreateTeam";

class TeamsRepository implements ITeamRepository {
  private ormRepository: Repository<Team>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Team);
  }

  public async create({
    name,
    description,
    leader_id,
    members_id,
    tourneys_id,
    file_url,
  }: ICreateTeam): Promise<Team> {
    const team = this.ormRepository.create({
      name,
      description,
      leader_id,
      members_id,
      tourneys_id,
      file_url,
    });

    await this.ormRepository.save(team);

    return team;
  }

  public async save(team: Team): Promise<Team> {
    await this.ormRepository.save(team);
    return team;
  }

  public async findById(id: ObjectId): Promise<Team | null> {
    const team = await this.ormRepository.findOne({
      where: { _id: id },
    });
    return team;
  }

  public async find(): Promise<Team[]> {
    const teams = await this.ormRepository.find();
    return teams;
  }

  public async remove(team: Team): Promise<void> {
    await this.ormRepository.remove(team);
  }

  public async update(team: Team): Promise<Team> {
    return this.ormRepository.save(team);
  }

  public async findByMemberId(memberId: ObjectId): Promise<Team[]> {
    const teams = await this.ormRepository.find({
      where: {
        members_id: memberId.toString(),
      },
    });
    return teams;
  }

  public async findByLeaderId(leaderId: string): Promise<Team[]> {
    const teams = await this.ormRepository.find({
      where: {
        leader_id: leaderId,
      },
    });
    return teams;
  }
}

export default TeamsRepository;
