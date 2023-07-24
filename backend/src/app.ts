/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config();

import api from "./api";
import * as middlewares from "./middlewares";
const app = express();

// https://mongoosejs.com/docs/connections.html#connection-events
// https://nodejs.org/api/events.html#events_class_events_eventemitter
mongoose.connect(process.env.MONGODB_ATLAS_URL || "");
const db = mongoose.connection;
db.on("error", (error: any) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
