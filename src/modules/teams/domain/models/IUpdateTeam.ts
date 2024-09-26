import { ObjectId } from "mongodb";

export interface IUpdateTeam {
  _id: ObjectId;
  name: string;
  description: string;
  leader_id: string;
  members_id: string[];
  tourneys_id: string[];
}
