import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import Team from "../infra/typeorm/entities/Team";
import path from 'path';
import { promises as fs } from 'fs';

@injectable()
class ShowOneTeamService {
  constructor(
    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(_id: ObjectId): Promise<Team | null> {
    const team = await this.teamsRepository.findById(new ObjectId(_id));

    if (!team) {
      return null;
    }

    if (team.file_url) {
      const imagePath = path.resolve(__dirname, '..', '../../..', team.file_url);
      try {
        const imageBuffer = await fs.readFile(imagePath);
        const imageBase64 = imageBuffer.toString('base64');

        const teamWithImage = {
          ...team,
          image: imageBase64,
        };

        return teamWithImage;
      } catch (error) {
        console.error('Erro ao ler a imagem:', error);
        return team;
      }
    }

    return team;
  }
}

export default ShowOneTeamService;
