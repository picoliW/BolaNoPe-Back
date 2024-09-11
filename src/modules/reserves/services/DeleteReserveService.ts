import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import { IDeleteReserve } from "../domain/models/IDeleteReserve";

@injectable()
class DeleteReserveService {
  constructor(
    @inject("ReservesRepository")
    private reserveRepository: IReserveRepository,
  ) {}

  public async execute({ _id }: IDeleteReserve): Promise<void> {
    try {
      const reserve = await this.reserveRepository.findById(new ObjectId(_id));

      if (!reserve) {
        throw new NotFoundError("Reserve not found");
      }

      await this.reserveRepository.remove(reserve);
    } catch (error) {
      throw error;
    }
  }
}

export default DeleteReserveService;
