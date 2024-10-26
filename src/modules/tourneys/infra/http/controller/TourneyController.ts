import { Request, Response } from "express";
import { container } from "tsyringe";
import { ObjectId } from "mongodb";
import { ConflictError } from "@shared/errors/ConflictError";

import { BadRequestError } from "@shared/errors/BadRequestError";
import ListTourneyService from "@modules/tourneys/services/ListTourneyService";
import CreateTourneyService from "@modules/tourneys/services/CreateTourneyService";
import DeleteTourneyService from "@modules/tourneys/services/DeleteTourneyService";
import ShowOneTourneyService from "@modules/tourneys/services/ShowOneTourneyService";
import UpdateTourneyService from "@modules/tourneys/services/UpdateTourneyService";
import AddTeamToTourneyService from "@modules/tourneys/services/AddTeamToTourneyService";
import { NotFoundError } from "@shared/errors/NotFoundError";
import RemoveTeamFromTourneyService from "@modules/tourneys/services/RemoveTeamFromTourneyService";
import ListTeamsInTourneyService from "@modules/tourneys/services/ListTeamsInTourneySerivice";

export default class TourneysController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listTourney = container.resolve(ListTourneyService);

    const tourneys = await listTourney.execute();

    return res.json(tourneys);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      prize,
      id_teams,
      id_winner_team,
      date_from,
      date_until,
    } = request.body;

    const createTourney = container.resolve(CreateTourneyService);

    try {
      const tourney = await createTourney.execute({
        name,
        description,
        prize,
        id_teams,
        id_winner_team,
        date_from,
        date_until,
      });

      return response.status(201).json({ tourney });
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
    const deleteTourney = container.resolve(DeleteTourneyService);

    try {
      const objectId = new ObjectId(id);
      await deleteTourney.execute({ _id: objectId });
      return res.status(204).json();
    } catch (error) {
      return res.status(404).json({ message: "Tourney not found" });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showTourney = container.resolve(ShowOneTourneyService);
    const objectId = new ObjectId(id);
    const tourney = await showTourney.execute(objectId);

    if (!tourney) {
      return res.status(404).json({ error: "Tourney not found" });
    }

    return res.json(tourney);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name,
      description,
      prize,
      id_teams,
      id_winner_team,
      date_from,
      date_until,
    } = req.body;

    const updateTourneyService = container.resolve(UpdateTourneyService);
    const objectId = new ObjectId(id);

    try {
      const updatedTourneys = await updateTourneyService.execute({
        _id: objectId,
        name,
        description,
        prize,
        id_teams,
        id_winner_team,
        date_from,
        date_until,
      });

      return res.status(200).json(updatedTourneys);
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

  public async addTeam(req: Request, res: Response): Promise<Response> {
    const { id: tourneyId } = req.params;
    const { teamId } = req.body;

    const addTeamToTourney = container.resolve(AddTeamToTourneyService);
    const objectIdTourney = new ObjectId(tourneyId);
    const objectIdTeam = new ObjectId(teamId);

    try {
      const tourney = await addTeamToTourney.execute(
        objectIdTourney,
        objectIdTeam,
      );
      return res.json(tourney);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  public async removeTeam(req: Request, res: Response): Promise<Response> {
    const { id: tourneyId } = req.params;
    const { teamId } = req.body;

    if (!ObjectId.isValid(tourneyId) || !ObjectId.isValid(teamId)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }

    const removeTeamFromTourney = container.resolve(
      RemoveTeamFromTourneyService,
    );
    const objectIdTourney = new ObjectId(tourneyId);
    const objectIdTeam = new ObjectId(teamId);

    try {
      await removeTeamFromTourney.execute(objectIdTourney, objectIdTeam);
      return res.status(204).json();
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  public async listTeams(req: Request, res: Response): Promise<Response> {
    const { id: tourneyId } = req.params;
    const listTeamsInTourneyService = container.resolve(
      ListTeamsInTourneyService,
    );
    const objectId = new ObjectId(tourneyId);

    try {
      const teams = await listTeamsInTourneyService.execute(objectId);
      return res.json(teams);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
