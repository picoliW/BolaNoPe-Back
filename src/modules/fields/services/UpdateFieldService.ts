import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { IFieldsRepository } from "../domain/repositories/IFieldRepository";
import Field from "../infra/typeorm/entities/Field";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { IUpdateField } from "../domain/models/IUpdateField";

@injectable()
class UpdateFieldService {
  constructor(
    @inject("FieldsRepository")
    private fieldRepository: IFieldsRepository,
  ) {}

  public async execute({
    _id,
    name,
    location,
    value_hour,
    obs,
    days,
    schedules,
    available,
  }: IUpdateField): Promise<Partial<Field>> {
    const field = await this.fieldRepository.findById(new ObjectId(_id));

    if (!field) {
      throw new NotFoundError("Field not found");
    }

    const updatedFields: Partial<Field> = {};

    if (name) {
      field.name = name;
      updatedFields.name = name;
    }
    if (location) {
      field.location = location;
      updatedFields.location = location;
    }
    if (value_hour) {
      field.value_hour = value_hour;
      updatedFields.value_hour = value_hour;
    }
    if (obs) {
      field.obs = obs;
      updatedFields.obs = obs;
    }
    if (days) {
      field.days = days;
      updatedFields.days = days;
    }
    if (schedules) {
      field.schedules = schedules;
      updatedFields.schedules = schedules;
    }
    if (available) {
      field.available = available;
      updatedFields.available = available;
    }

    await this.fieldRepository.save(field);

    return updatedFields;
  }
}

export default UpdateFieldService;
