import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import Reserve from "../infra/typeorm/entities/Reserve";
import { IFieldsRepository } from "@modules/fields/domain/repositories/IFieldRepository";
import { IUpdateReserve } from "../domain/models/IUpdateReserve";

@injectable()
class UpdateReserveService {
  constructor(
    @inject("ReservesRepository")
    private reserveRepository: IReserveRepository,
    @inject("FieldsRepository")
    private fieldRepository: IFieldsRepository,
  ) {}

  public async execute({
    _id,
    id_user,
    start_hour,
    end_hour,
    id_field,
  }: IUpdateReserve): Promise<Reserve> {
    const reserve = await this.reserveRepository.findById(new ObjectId(_id));
    if (!reserve) {
      throw new NotFoundError("Reserve not found");
    }

    if (id_user) reserve.id_user = id_user;
    if (start_hour) reserve.start_hour = start_hour;
    if (end_hour) reserve.end_hour = end_hour;

    if (id_field) {
      const field = await this.fieldRepository.findById(new ObjectId(id_field));
      if (!field) {
        throw new NotFoundError("Field not found");
      }
      reserve.id_field = id_field;
    }

    await this.reserveRepository.save(reserve);

    return reserve;
  }
}

export default UpdateReserveService;
