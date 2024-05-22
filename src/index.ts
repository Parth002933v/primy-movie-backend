import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import adminRouter from "./routes/admin.route";
import movieRouter from "./routes/movie.route";
import genereRouter from "./routes/genere.route";
import ageRatingRouter from "./routes/ageRating.route";
import languageRouter from "./routes/language.route";
import videoQualityRouter from "./routes/videoQualitys.route";
import categoryRouter from "./routes/category.route";

import MovieProviserRouter from "./routes/movieProvider.router";

import customError from "./utils/ErrorObject";
import { globalErrorHandler } from "./middleware/errorHandler.middleware";

dotenv.config({ path: ".env" });

process.on("uncaughtException", (err: Error) => {
  console.log(err.message);
  console.log("unhandled rejection is occured! shutting down...");

  server.close();
});

//connectDB
connectDB()
  
// Create Express app
const app: Express = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5000", // Replace with your allowed origin(s)
  optionsSuccessStatus: 200, // Some legacy browsers (e.g., IE11) choke on 204
};
app.use(cors(corsOptions));

// view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("src/view"));
app.use(express.static("public"));

// Define a route handler for the root path
app.get("/", (req: Request, res: Response) => {
  res.end("server is running");
});

//api routes
app.use("/api/admin", adminRouter);
app.use("/api/movies", movieRouter);
app.use("/api/generes", genereRouter);
app.use("/api/age-rating", ageRatingRouter);
app.use("/api/language", languageRouter);
app.use("/api/video-quality", videoQualityRouter);
app.use("/api/category", categoryRouter);

app.use("/api/movie-provider", MovieProviserRouter);

// for incorrect route
app.use("*", (req, res, next) => {
  const error = new customError({
    message: `can't find ${req.originalUrl} on the server`,
    statusCode: 404,
  });

  next(error);
});

// global error handler
app.use(globalErrorHandler);

// Start the server
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});

// if unhandled exception in occcure the app will shutdown
process.on("unhandledRejection", (err: Error) => {
  console.log(err.message);
  console.log("unhandled rejection is occured! shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
