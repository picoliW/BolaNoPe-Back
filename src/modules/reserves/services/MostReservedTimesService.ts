import { inject, injectable } from "tsyringe";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";

interface IFieldMostReservedTime {
  id_field: string;
  most_reserved_times: { time: string; count: number }[];
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

    // Mapear os 5 horários mais reservados para cada campo
    const mostReservedTimes: IFieldMostReservedTime[] = Object.entries(
      fieldReservationsCount,
    ).map(([id_field, times]) => {
      const sortedTimes = Object.entries(times)
        .map(([time, count]) => ({ time, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return {
        id_field,
        most_reserved_times: sortedTimes,
      };
    });

    return mostReservedTimes;
  }
}

export default MostReservedTimesService;
