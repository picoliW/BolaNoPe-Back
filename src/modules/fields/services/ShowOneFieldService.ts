import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { IFieldsRepository } from "../domain/repositories/IFieldRepository";
import Field from "../infra/typeorm/entities/Field";

@injectable()
class ShowOneFieldService {
  constructor(
    @inject("FieldsRepository")
    private fieldRepository: IFieldsRepository,
  ) {}

  public async execute(_id: ObjectId): Promise<Field | null> {
    const field = await this.fieldRepository.findById(new ObjectId(_id));

    return field;
  }
}

export default ShowOneFieldService;
