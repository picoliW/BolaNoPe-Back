import { Request, Response } from "express";
import { container } from "tsyringe";
import { ConflictError } from "@shared/errors/ConflictError";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { BadRequestError } from "@shared/errors/BadRequestError";
import { ObjectId } from "mongodb";
import ListReserveService from "@modules/reserves/services/ListReserveService";
import CreateReserveService from "@modules/reserves/services/CreateReserveService";
import ShowOneReserveService from "@modules/reserves/services/ShowOneReserveService";
import UpdateReserveService from "@modules/reserves/services/UpdateReserveService";
import DeleteReserveService from "@modules/reserves/services/DeleteReserveService";

export default class ReserveController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listReserve = container.resolve(ListReserveService);
    const { reserves } = await listReserve.execute();

    return res.json({
      reserves,
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        id_user,
        reserve_day,
        start_hour,
        end_hour,
        id_field,
        final_value,
      } = request.body;

      const createReserve = container.resolve(CreateReserveService);

      const reserve = await createReserve.execute({
        id_user,
        reserve_day,
        start_hour,
        end_hour,
        id_field,
        final_value,
      });

      return response.status(201).json(reserve);
    } catch (error) {
      if (error instanceof ConflictError) {
        return response.status(409).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return response.status(400).json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: "penis1" });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const showReserve = container.resolve(ShowOneReserveService);
      const objectId = new ObjectId(id);
      const reserve = await showReserve.execute(objectId);

      return res.json(reserve);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "internal Server Error" });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { id_user, reserve_day, start_hour, end_hour, id_field } = req.body;
      const updateReserve = container.resolve(UpdateReserveService);
      const objectId = new ObjectId(id);
      const reserve = await updateReserve.execute({
        _id: objectId,
        reserve_day,
        id_user,
        start_hour,
        end_hour,
        id_field,
      });

      return res.status(201).json(reserve);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "internal Server Error" });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteReserve = container.resolve(DeleteReserveService);

    try {
      const objectId = new ObjectId(id);
      await deleteReserve.execute({ _id: objectId });
      return res.status(204).json();
    } catch (error) {
      return res.status(404).json({ message: "Reserve not found" });
    }
  }
}
