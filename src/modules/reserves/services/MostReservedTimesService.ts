import { inject, injectable } from "tsyringe";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";

interface IFieldMostReservedTime {
  id_field: string;
  most_reserved_time: string;
}

@injectable()
class MostReservedTimesService {
  constructor(
    @inject("ReservesRepository")
    private reserveRepository: IReserveRepository,
  ) {}

  public async execute(): Promise<IFieldMostReservedTime[]> {
    const reserves = await this.reserveRepository.find();

    const fieldReservationsCount: Record<string, Record<string, number>> = {};

    reserves.forEach(({ id_field, start_hour }) => {
      if (!fieldReservationsCount[id_field]) {
        fieldReservationsCount[id_field] = {};
      }

      if (!fieldReservationsCount[id_field][start_hour]) {
        fieldReservationsCount[id_field][start_hour] = 0;
      }

      fieldReservationsCount[id_field][start_hour] += 1;
    });

    const mostReservedTimes: IFieldMostReservedTime[] = Object.entries(
      fieldReservationsCount,
    ).map(([id_field, times]) => {
      const mostReservedTime = Object.entries(times).reduce(
        (max, [time, count]) => (count > max.count ? { time, count } : max),
        { time: "", count: 0 },
      );

      return {
        id_field,
        most_reserved_time: mostReservedTime.time,
      };
    });

    return mostReservedTimes;
  }
}

export default MostReservedTimesService;
