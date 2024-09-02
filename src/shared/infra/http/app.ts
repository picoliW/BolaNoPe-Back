import "reflect-metadata";
import "@shared/container";
import { errors } from "celebrate";
import cors from "cors";
import express from "express";
import routes from "./routes";
import { ErrorHandlerMiddleware } from "./middlewares/ErrorHandler";
import { NotFound } from "./middlewares/NotFound";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routes);

app.use(errors());
app.use(ErrorHandlerMiddleware);
app.use(NotFound);

export { app };
