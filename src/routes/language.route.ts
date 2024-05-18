import express from "express";
import { handleGetAllLanguages } from "../controller/language.controller";

const router = express.Router();

router.route("/").get(handleGetAllLanguages);

export default router;
