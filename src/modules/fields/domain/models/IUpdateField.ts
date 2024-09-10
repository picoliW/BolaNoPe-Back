import { ObjectId } from "mongodb";

export interface IUpdateField {
  _id: ObjectId;
  name: string;
  location: string;
  value: string;
  obs?: string;
  days: string;
  schedules: string;
  available: boolean;
}
