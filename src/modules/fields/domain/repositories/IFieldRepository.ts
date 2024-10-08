import Field from "@modules/fields/infra/typeorm/entities/Field";
import { ICreateField } from "../models/ICreateField";
import { ObjectId } from "mongodb";

export interface IFieldsRepository {
  create({
    name,
    location,
    value_hour,
    obs,
    file_url,
    open_time,
    close_time,
    available,
  }: ICreateField): Promise<Field>;
  save(field: Field): Promise<Field>;
  find(): Promise<Field[]>;
  remove(field: Field): Promise<void>;
  findById(id: ObjectId): Promise<Field | null>;
  update(field: Field): Promise<Field>;
}
