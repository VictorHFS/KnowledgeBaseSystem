import express from "express";
import logger from "morgan";
import * as path from "path";
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";
import { router } from "./routes/index";
import { json } from 'body-parser';

export const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(json());

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);

app.use(errorNotFoundHandler);
app.use(errorHandler);
