import { ObjectId } from "mongodb";
import { ICreateTourney } from "../models/ICreateTourney";
import Tourney from "@modules/tourneys/infra/typeorm/entities/Tourney";

export interface ITourneyRepository {
  create({
    name,
    description,
    prize,
    id_teams,
    id_winner_team,
    date_from,
    date_until,
  }: ICreateTourney): Promise<Tourney>;
  save(tourney: Tourney): Promise<Tourney>;
  find(): Promise<Tourney[]>;
  remove(tourney: Tourney): Promise<void>;
  findById(id: ObjectId): Promise<Tourney | null>;
  update(tourney: Tourney): Promise<Tourney>;
}
