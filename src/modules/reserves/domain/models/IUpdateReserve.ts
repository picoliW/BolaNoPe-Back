import { ObjectId } from "mongodb";

export interface IUpdateReserve {
  _id: ObjectId;
  id_user?: string;
  start_hour?: string;
  end_hour?: string;
  id_field?: string;
  final_value?: string;
}
