import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { dataSource } from "@shared/infra/typeorm";
import User from "@modules/users/infra/typeorm/entities/User";

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const userRepository = dataSource.getRepository(User);

  if (!request.user || !request.user.id) {
    return response.status(401).json({ message: "User is not authenticated" });
  }

  try {
    const user = await userRepository.findOne({
      where: { _id: new ObjectId(request.user.id) },
    });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return response
        .status(403)
        .json({ message: "User does not have admin rights" });
    }

    return next();
  } catch (error) {
    return response.status(500).json({ message: "Server error" });
  }
}
