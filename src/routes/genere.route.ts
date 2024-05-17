import express from "express";
import {
  getAllGeneres,
  handleCreateGenere,
} from "../controller/genere.controller";

// /api/generes
const router = express.Router();

router.route("/").get(getAllGeneres).post(handleCreateGenere);

export default router;
