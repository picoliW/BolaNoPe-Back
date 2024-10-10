import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import path from 'path';
import { promises as fs } from 'fs';

@injectable()
class ShowOneUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(_id: ObjectId): Promise<any | null> {
    const user = await this.usersRepository.findById(new ObjectId(_id));

    if (!user) {
      return null;
    }

    if (user.file_url) {
      const imagePath = path.resolve(__dirname, '..', '../../..', user.file_url);
      try {
        const imageBuffer = await fs.readFile(imagePath);
        const imageBase64 = imageBuffer.toString('base64');

        const userWithImage = {
          ...user,
          image: imageBase64,
        };

        return userWithImage;
      } catch (error) {
        console.error('Erro ao ler a imagem:', error);
        return user;
      }
    }

    return user;
  }
}

export default ShowOneUserService;
