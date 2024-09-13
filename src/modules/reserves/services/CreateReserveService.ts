import { inject, injectable } from "tsyringe";
import Reserve from "../infra/typeorm/entities/Reserve";
import { ObjectId } from "mongodb";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ConflictError } from "@shared/errors/ConflictError";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import { IFieldsRepository } from "@modules/fields/domain/repositories/IFieldRepository";
import { ICreateReserve } from "../domain/models/ICreateReserve";

@injectable()
class CreateReserveService {
  constructor(
    @inject("ReservesRepository")
    private reserveRepository: IReserveRepository,
    @inject("FieldsRepository")
    private fieldRepository: IFieldsRepository,
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    id_user,
    reserve_day,
    start_hour,
    end_hour,
    id_field,
  }: ICreateReserve): Promise<Reserve> {
    const user = await this.userRepository.findById(new ObjectId(id_user));
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const field = await this.fieldRepository.findById(new ObjectId(id_field));
    if (!field) {
      throw new NotFoundError("Field not found");
    }

    const overlappingReserve = await this.reserveRepository.findByParams({
      id_field,
      reserve_day,
      start_hour: { $lt: end_hour },
      end_hour: { $gt: start_hour },
    });

    if (overlappingReserve.length > 0) {
      throw new ConflictError("Field is already reserved during this time.");
    }

    const value_hour = parseFloat(field.value_hour);
    const start = new Date(`1970-01-01T${start_hour}:00Z`).getTime();
    const end = new Date(`1970-01-01T${end_hour}:00Z`).getTime();
    const durationHours = (end - start) / (1000 * 60 * 60);
    const final_value = durationHours * value_hour;

    const reserve = await this.reserveRepository.create({
      id_user,
      reserve_day,
      start_hour,
      end_hour,
      id_field,
      final_value: final_value.toString(),
    });

    await this.reserveRepository.save(reserve);

    return reserve;
  }
}

export default CreateReserveService;
