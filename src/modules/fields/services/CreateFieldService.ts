import { inject, injectable } from "tsyringe";
import { IFieldsRepository } from "../domain/repositories/IFieldRepository";
import { ICreateField } from "../domain/models/ICreateField";
import Field from "../infra/typeorm/entities/Field";

@injectable()
class CreateFieldService {
  constructor(
    @inject("FieldsRepository")
    private fieldsRepository: IFieldsRepository,
  ) {}

  public async execute({
    name,
    location,
    value_hour,
    obs,
    open_time,
    close_time,
    available,
  }: ICreateField): Promise<Field> {
    const field = await this.fieldsRepository.create({
      name,
      location,
      value_hour,
      obs,
      open_time,
      close_time,
      available,
    });

    await this.fieldsRepository.save(field);

    return field;
  }
}

export default CreateFieldService;
