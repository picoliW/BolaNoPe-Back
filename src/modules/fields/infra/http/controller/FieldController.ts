import { Request, Response } from "express";
import CreateFieldService from "@modules/fields/services/CreateFieldService";
import { container } from "tsyringe";
import ListFieldService from "@modules/fields/services/ListFieldService";
import DeleteFieldService from "@modules/fields/services/DeleteFieldService";
import { ObjectId } from "mongodb";
import ShowOneFieldService from "@modules/fields/services/ShowOneFieldService";
import UpdateFieldService from "@modules/fields/services/UpdateFieldService";
import { ConflictError } from "@shared/errors/ConflictError";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { BadRequestError } from "@shared/errors/BadRequestError";

export default class FieldsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listField = container.resolve(ListFieldService);

    const fields = await listField.execute();

    return res.json(fields);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      location,
      value_hour,
      obs,
      open_time,
      close_time,
      available,
    } = request.body;

    const file = request.file;

    const createField = container.resolve(CreateFieldService);

    try {
      const field = await createField.execute({
        name,
        location,
        value_hour,
        obs,
        open_time,
        close_time,
        available,
        file,
      });

      return response.status(201).json({ field });
    } catch (error) {
      if (error instanceof ConflictError) {
        return response.status(409).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return response.status(400).json({ message: error.message });
      }
      throw error;
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteField = container.resolve(DeleteFieldService);

    try {
      const objectId = new ObjectId(id);
      await deleteField.execute({ _id: objectId });
      return res.status(204).json();
    } catch (error) {
      return res.status(404).json({ message: "Field not found" });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showField = container.resolve(ShowOneFieldService);
    const objectId = new ObjectId(id);
    const field = await showField.execute(objectId);

    if (!field) {
      return res.status(404).json({ error: "Field not found" });
    }

    return res.json(field);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name,
      location,
      value_hour,
      obs,
      file_url,
      open_time,
      close_time,
      available,
    } = req.body;
    const updateFieldService = container.resolve(UpdateFieldService);
    const objectId = new ObjectId(id);

    try {
      const updatedFields = await updateFieldService.execute({
        _id: objectId,
        name,
        location,
        value_hour,
        obs,
        file_url,
        open_time,
        close_time,
        available,
      });

      return res.status(200).json(updatedFields);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof ConflictError) {
        return res.status(409).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return res.status(400).json({ message: error.message });
      }
      throw error;
    }
  }
}
