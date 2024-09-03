import { Request, Response } from "express";
import { container } from "tsyringe";
import LoginService from "@modules/users/services/LoginService";

export default class AuthController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const loginService = container.resolve(LoginService);

    try {
      const { token } = await loginService.execute({ email, password });

      return response.json({ token });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(401).json({ message: error.message });
      }
      return response.status(401).json({ message: "Unknown error" });
    }
  }
}
