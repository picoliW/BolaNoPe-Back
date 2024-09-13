import { ObjectId } from "mongodb";

export interface IUpdateField {
  _id: ObjectId;
  name: string;
  location: string;
  value_hour: string;
  obs?: string;
  file_url: string;
  open_time: string;
  close_time: string;
  available: boolean;
}
