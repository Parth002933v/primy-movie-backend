import express from "express";
import {
  handleCerateMovie,
  handleGetMovies,
  validateMovieModdelware,
} from "../controller/movies.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = express.Router();

router
  .route("/")
  .get(handleGetMovies)
  .post(verifyJWT, validateMovieModdelware, handleCerateMovie);

export default router;
