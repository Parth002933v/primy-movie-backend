import express from "express";

import { verifyJWT } from "../middleware/auth.middleware";
import {
  handleGetAllAgeRatings,
  hanldeCreateAgeRatings,
} from "../controller/ageRating.controller";

// /api/generes
const router = express.Router();

router
  .route("/")
  .get(handleGetAllAgeRatings)
  .post(verifyJWT, hanldeCreateAgeRatings);

export default router;
