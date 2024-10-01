export interface ICreateTourney {
  name: string;
  description?: string;
  prize?: string;
  id_teams?: string[];
  id_winner_team?: string;
  date_from: string;
  date_until: string;
}
