import express from "express";
import {
  handleCreateMovieProvider,
  handleGetMovieProvider,
} from "../controller/movieProvider.controller";
import { upload } from "../utils/upload";

const router = express.Router();

router
  .route("/")
  .get(handleGetMovieProvider)
  .post(upload.single("providerImage"), handleCreateMovieProvider);

export default router;
