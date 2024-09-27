import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { dataSource } from "@shared/infra/typeorm";
import User from "@modules/users/infra/typeorm/entities/User";
import Team from "@modules/teams/infra/typeorm/entities/Team";

export default async function ensureLeaderOrAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const userRepository = dataSource.getRepository(User);
  const teamRepository = dataSource.getRepository(Team);

  if (!request.user || !request.user.id) {
    return response.status(401).json({ message: "User is not authenticated" });
  }

  const { teamId } = request.params;

  try {
    const user = await userRepository.findOne({
      where: { _id: new ObjectId(request.user.id) },
    });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    const team = await teamRepository.findOne({
      where: { _id: new ObjectId(teamId) },
    });

    if (!team) {
      return response.status(404).json({ message: "Team not found" });
    }

    if (
      team.leader_id.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return response
        .status(403)
        .json({ message: "User is not authorized to perform this action" });
    }

    return next();
  } catch (error) {
    return response.status(500).json({ message: "Server error" });
  }
}
