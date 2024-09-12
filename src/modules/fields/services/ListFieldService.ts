import { inject, injectable } from "tsyringe";
import { IFieldsRepository } from "../domain/repositories/IFieldRepository";
import Field from "../infra/typeorm/entities/Field";

@injectable()
class ListFieldService {
  constructor(
    @inject("FieldsRepository")
    private fieldRepository: IFieldsRepository,
  ) {}
  public async execute(): Promise<Field[]> {
    const fields = await this.fieldRepository.find();

    return fields;
  }
}

export default ListFieldService;
