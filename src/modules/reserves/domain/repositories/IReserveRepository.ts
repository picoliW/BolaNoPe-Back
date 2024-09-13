import { ObjectId } from "mongodb";
import { ICreateReserve } from "../models/ICreateReserve";
import Reserve from "@modules/reserves/infra/typeorm/entities/Reserve";

export interface IReserveRepository {
  create({
    id_user,
    reserve_day,
    start_hour,
    end_hour,
    id_field,
    final_value,
  }: ICreateReserve): Promise<Reserve>;
  save(reserve: Reserve): Promise<Reserve>;
  find(): Promise<Reserve[]>;
  findById(id: ObjectId): Promise<Reserve | null>;
  update(reserve: Reserve): Promise<Reserve>;
  remove(reserve: Reserve): Promise<void>;
}
