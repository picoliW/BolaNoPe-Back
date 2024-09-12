import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";
import { IFieldsRepository } from "../domain/repositories/IFieldRepository";
import { IDeleteField } from "../domain/models/IDeleteField";

@injectable()
class DeleteFieldService {
  constructor(
    @inject("FieldsRepository")
    private fieldRepository: IFieldsRepository,
  ) {}

  public async execute({ _id }: IDeleteField): Promise<void> {
    try {
      const field = await this.fieldRepository.findById(new ObjectId(_id));

      if (!field) {
        throw new NotFoundError("Field not found");
      }

      await this.fieldRepository.remove(field);
    } catch (error) {
      throw error;
    }
  }
}

export default DeleteFieldService;
