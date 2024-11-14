import { inject, injectable } from "tsyringe";
import { ITeamRepository } from "../domain/repositories/ITeamRepository";
import Team from "../infra/typeorm/entities/Team";
import { ObjectId } from "mongodb";
import path from 'path';
import { promises as fs } from 'fs';

@injectable()
class ListTeamsByMemberService {
  constructor(
    @inject("TeamsRepository")
    private teamsRepository: ITeamRepository,
  ) {}

  public async execute(memberId: ObjectId): Promise<Team[]> {
    const teams = await this.teamsRepository.findByMemberId(memberId);
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

export default ListTeamsByMemberService;
