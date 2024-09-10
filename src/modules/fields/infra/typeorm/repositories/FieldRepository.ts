import { Repository } from "typeorm";
import Field from "../entities/Field";
import { dataSource } from "@shared/infra/typeorm";
import { IFieldsRepository } from "@modules/fields/domain/repositories/IFieldRepository";
import { ICreateField } from "@modules/fields/domain/models/ICreateField";
import { ObjectId } from "mongodb";

class FieldsRepository implements IFieldsRepository {
  private ormRepository: Repository<Field>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Field);
  }

  public async create({
    name,
    location,
    value,
    obs,
    days,
    schedules,
    available,
  }: ICreateField): Promise<Field> {
    const field = this.ormRepository.create({
      name,
      location,
      value,
      obs,
      days,
      schedules,
      available,
    });

    await this.ormRepository.save(field);

    return field;
  }

  public async save(field: Field): Promise<Field> {
    await this.ormRepository.save(field);
    return field;
  }

  public async findById(id: ObjectId): Promise<Field | null> {
    const field = await this.ormRepository.findOne({
      where: { _id: id },
    });
    return field;
  }

  public async find(): Promise<Field[]> {
    const fields = await this.ormRepository.find();
    return fields;
  }

  public async remove(field: Field): Promise<void> {
    await this.ormRepository.remove(field);
  }

  public async update(field: Field): Promise<Field> {
    return this.ormRepository.save(field);
  }
}

export default FieldsRepository;
