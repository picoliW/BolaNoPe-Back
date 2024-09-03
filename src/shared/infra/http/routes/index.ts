import authRouter from "@modules/users/infra/http/routes/Auth.route";
import usersRouter from "@modules/users/infra/http/routes/User.route";
import { Router } from "express";

const routes = Router();

routes.use("/user", usersRouter);

routes.use("/auth", authRouter);

routes.get("/", (request, response) => {
  return response.json("Hello world");
});

export default routes;
