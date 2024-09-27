import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { IFieldsRepository } from "../domain/repositories/IFieldRepository";
import Field from "../infra/typeorm/entities/Field";
import { promises as fs } from 'fs';
import path from 'path';

@injectable()
class ShowOneFieldService {
  constructor(
    @inject("FieldsRepository")
    private fieldRepository: IFieldsRepository,
  ) {}

  public async execute(_id: ObjectId): Promise<any | null> {
    const field = await this.fieldRepository.findById(new ObjectId(_id));

    if (!field) {
      return null;
    }

    if (field.file_url) {
      const imagePath = path.resolve(__dirname, '..', '../../..', field.file_url);
      try {
        const imageBuffer = await fs.readFile(imagePath);
        const imageBase64 = imageBuffer.toString('base64');

        const fieldWithImage = {
          ...field,
          image: imageBase64,
        };

        return fieldWithImage;
      } catch (error) {
        console.error('Erro ao ler a imagem:', error);
        return field;
      }
    }

    return field;
  }
}

export default ShowOneFieldService;
