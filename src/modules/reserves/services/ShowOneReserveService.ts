import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import Reserve from "../infra/typeorm/entities/Reserve";
import { NotFoundError } from "@shared/errors/NotFoundError";

@injectable()
class ShowOneReserveService {
  constructor(
    @inject("ReservesRepository")
    private reserveRepository: IReserveRepository,
  ) {}

  public async execute(_id: ObjectId): Promise<Reserve | null> {
    const reserve = await this.reserveRepository.findById(new ObjectId(_id));

    if (!reserve) {
      throw new NotFoundError("Reserve not found");
    }

    return reserve;
  }
}

export default ShowOneReserveService;
