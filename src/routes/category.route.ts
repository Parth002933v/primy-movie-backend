import express from "express";

import { handleGetAllCategorys } from "../controller/category.controller";

// /api/generes
const router = express.Router();

router.route("/").get(handleGetAllCategorys);

export default router;
