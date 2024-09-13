import { inject, injectable } from "tsyringe";
import { IFieldsRepository } from "../domain/repositories/IFieldRepository";
import Field from "../infra/typeorm/entities/Field";
import { promises as fs } from 'fs';
import path from 'path';

@injectable()
class ListFieldService {
  constructor(
    @inject("FieldsRepository")
    private fieldRepository: IFieldsRepository,
  ) {}
  public async execute(): Promise<Field[]> {
    const fields = await this.fieldRepository.find();

    const fieldsWithImages = await Promise.all(fields.map(async field => {
      const imagePath = path.resolve(__dirname, '..', '../../../', field.file_url);
      
      const imageBuffer = await fs.readFile(imagePath);
      
      const imageBase64 = imageBuffer.toString('base64');

      return {
        ...field,
        image: imageBase64
      };
    }));

    return fieldsWithImages;
  }
}

export default ListFieldService;
