import express from "express";
import {
  getAllGeneres,
  handleCreateGenere,
} from "../controller/genere.controller";
import { verifyJWT } from "../middleware/auth.middleware";

// /api/generes
const router = express.Router();

router.route("/").get(getAllGeneres).post(verifyJWT, handleCreateGenere);

export default router;
