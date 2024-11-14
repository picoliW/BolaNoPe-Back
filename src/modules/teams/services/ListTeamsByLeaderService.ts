import { inject, injectable } from "tsyringe";
import Team from "../infra/typeorm/entities/Team";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import path from 'path';
import { promises as fs } from 'fs';

@injectable()
class ListTeamsByLeaderService {
  constructor(
    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(leaderId: string): Promise<Team[]> {
    const teams = await this.teamsRepository.findByLeaderId(leaderId);
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

export default ListTeamsByLeaderService;
