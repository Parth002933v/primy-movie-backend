import express from "express";
import { handleGetAllLanguages } from "../controller/language.controller";
import {
  handleGetAllVideoQuality,
  hanldeCreateVideoQuality,
} from "../controller/videoQuality.Controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = express.Router();

router
  .route("/")
  .get(handleGetAllVideoQuality)
  .post(verifyJWT, hanldeCreateVideoQuality);

export default router;
