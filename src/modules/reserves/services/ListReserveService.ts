import { inject, injectable } from "tsyringe";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import Reserve from "../infra/typeorm/entities/Reserve";

@injectable()
class ListReserveService {
  constructor(
    @inject("ReservesRepository")
    private reserveRepository: IReserveRepository,
  ) {}

  public async execute(): Promise<{ reserves: Reserve[] }> {
    const reserves = await this.reserveRepository.find();

    return { reserves };
  }
}

export default ListReserveService;
