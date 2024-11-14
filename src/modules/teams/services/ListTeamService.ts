import { inject, injectable } from "tsyringe";
import Team from "../infra/typeorm/entities/Team";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import path from 'path';
import { promises as fs } from 'fs';

@injectable()
class ListTeamService {
  constructor(
    @inject("TeamsRepository")
    private teamRepository: ITeamRepository,
  ) {}
  public async execute(): Promise<Team[]> {
    const teams = await this.teamRepository.find();
    const teamsWithImages = await Promise.all(
      teams.map(async (team) => {
        if (team.file_url) {
          const imagePath = path.resolve(__dirname, '..', '../../..', team.file_url);
          try {
            const imageBuffer = await fs.readFile(imagePath);
            const imageBase64 = imageBuffer.toString('base64');

            return {
              ...team,
              image: imageBase64,
            };
          } catch (error) {
            console.error('Erro ao ler a imagem:', error);
            return team;
          }
        }
        return team;
      })
    );

    return teamsWithImages;
  }
}

export default ListTeamService;
