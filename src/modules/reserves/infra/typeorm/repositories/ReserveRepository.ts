import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import Reserve from "../entities/Reserve";
import { ObjectId } from "mongodb";
import { IReserveRepository } from "@modules/reserves/domain/repositories/IReserveRepository";
import { ICreateReserve } from "@modules/reserves/domain/models/ICreateReserve";

class ReserveRepository implements IReserveRepository {
  private ormRepository: Repository<Reserve>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Reserve);
  }

  public async create({
    id_user,
    reserve_day,
    start_hour,
    end_hour,
    id_field,
    final_value,
  }: ICreateReserve): Promise<Reserve> {
    const reserve = this.ormRepository.create({
      id_user,
      reserve_day,
      start_hour,
      end_hour,
      id_field,
      final_value,
    });

    await this.ormRepository.save(reserve);

    return reserve;
  }

  public async save(reserve: Reserve): Promise<Reserve> {
    await this.ormRepository.save(reserve);
    return reserve;
  }

  public async find(): Promise<Reserve[]> {
    const reserve = await this.ormRepository.find();
    return reserve;
  }

  public async findByParams(params: Record<string, any>): Promise<Reserve[]> {
    return this.ormRepository.find({
      where: params,
    });
  }

  public async findById(id: ObjectId): Promise<Reserve | null> {
    const reserve = await this.ormRepository.findOne({
      where: { _id: id },
    });
    return reserve;
  }

  public async update(reserve: Reserve): Promise<Reserve> {
    return this.ormRepository.save(reserve);
  }

  public async remove(reserve: Reserve): Promise<void> {
    await this.ormRepository.remove(reserve);
  }
}

export default ReserveRepository;
