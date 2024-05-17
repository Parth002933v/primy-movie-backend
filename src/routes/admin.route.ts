import { Router } from "express";
import { signInAdmin, signUpAdmin } from "../controller/admin.controller";

const router = Router();

router.get("/", () => {
  console.log("admin");
});
router.post("/login", signInAdmin);

router.post("/signup", signUpAdmin);

export default router;
