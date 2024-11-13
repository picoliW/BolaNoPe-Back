export interface ICreateTeam {
  name: string;
  description?: string;
  leader_id: string;
  members_id?: string[];
  tourneys_id?: string[];
  file_url?: string;
}
