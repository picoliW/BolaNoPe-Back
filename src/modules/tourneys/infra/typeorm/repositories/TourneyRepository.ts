import { Repository } from "typeorm";
import Tourney from "../entities/Tourney";
import { dataSource } from "@shared/infra/typeorm";
import { ObjectId } from "mongodb";
import { ITourneyRepository } from "@modules/tourneys/domain/repositories/ITourneyRepository";
import { ICreateTourney } from "@modules/tourneys/domain/models/ICreateTourney";

class TourneysRepository implements ITourneyRepository {
  private ormRepository: Repository<Tourney>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Tourney);
  }

  public async create({
    name,
    description,
    prize,
    id_teams,
    id_winner_team,
    date_from,
    date_until,
  }: ICreateTourney): Promise<Tourney> {
    const tourney = this.ormRepository.create({
      name,
      description,
      prize,
      id_teams,
      id_winner_team,
      date_from,
      date_until,
    });

    await this.ormRepository.save(tourney);

    return tourney;
  }

  public async save(tourney: Tourney): Promise<Tourney> {
    await this.ormRepository.save(tourney);
    return tourney;
  }

  public async findById(id: ObjectId): Promise<Tourney | null> {
    const tourney = await this.ormRepository.findOne({
      where: { _id: id },
    });
    return tourney;
  }

  public async find(): Promise<Tourney[]> {
    const tourneys = await this.ormRepository.find();
    return tourneys;
  }

  public async remove(tourney: Tourney): Promise<void> {
    await this.ormRepository.remove(tourney);
  }

  public async update(tourney: Tourney): Promise<Tourney> {
    return this.ormRepository.save(tourney);
  }
}

export default TourneysRepository;
