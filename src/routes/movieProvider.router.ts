import express from "express";
import {
  handleCreateMovieProvider,
  handleGetMovieProvider,
} from "../controller/movieProvider.controller";
import { upload } from "../utils/upload";
import { verifyJWT } from "../middleware/auth.middleware";

const router = express.Router();

router
  .route("/")
  .get(handleGetMovieProvider)
  .post(verifyJWT, upload.single("providerImage"), handleCreateMovieProvider);

export default router;
