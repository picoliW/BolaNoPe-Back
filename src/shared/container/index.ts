import { IFieldsRepository } from "@modules/fields/domain/repositories/IFieldRepository";
import FieldsRepository from "@modules/fields/infra/typeorm/repositories/FieldRepository";
import { INotificationRepository } from "@modules/notifications/domain/repositories/INotificationRepository";
import NotificationRepository from "@modules/notifications/infra/typeorm/repositories/NotificationRepository";
import { IReserveRepository } from "@modules/reserves/domain/repositories/IReserveRepository";
import ReserveRepository from "@modules/reserves/infra/typeorm/repositories/ReserveRepository";
import { ITeamRepository } from "@modules/teams/domain/repositories/ITeamRepository";
import { ITeamRequestRepository } from "@modules/teams/domain/repositories/ITeamRequestRepository";
import TeamsRepository from "@modules/teams/infra/typeorm/repositories/TeamRepositoy";
import TeamRequestRepository from "@modules/teams/infra/typeorm/repositories/TeamRequestRepository";
import { ITourneyRepository } from "@modules/tourneys/domain/repositories/ITourneyRepository";
import TourneysRepository from "@modules/tourneys/infra/typeorm/repositories/TourneyRepository";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IFieldsRepository>(
  "FieldsRepository",
  FieldsRepository,
);

container.registerSingleton<IReserveRepository>(
  "ReservesRepository",
  ReserveRepository,
);

container.registerSingleton<ITourneyRepository>(
  "TourneysRepository",
  TourneysRepository,
);

container.registerSingleton<ITeamRepository>(
  "TeamsRepository",
  TeamsRepository,
);

container.registerSingleton<ITeamRequestRepository>(
  "TeamRequestRepository",
  TeamRequestRepository,
);

container.registerSingleton<INotificationRepository>(
  "NotificationsRepository",
  NotificationRepository,
);
