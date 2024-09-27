import { inject, injectable } from "tsyringe";
import Reserve from "../infra/typeorm/entities/Reserve";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import { NotFoundError } from "@shared/errors/NotFoundError";

@injectable()
class ListReserveByFieldService {
  constructor(
    @inject("ReservesRepository")
    private reserveRepository: IReserveRepository,
  ) {}

  public async execute(id_field: string): Promise<Reserve[]> {
    const reserves = await this.reserveRepository.findByField(id_field);

    if (!reserves.length) {
      throw new NotFoundError("No reservations found for this field.");
    }

    return reserves;
  }
}

export default ListReserveByFieldService;
