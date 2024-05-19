"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controller/admin.controller");
const router = (0, express_1.Router)();
router.get("/", () => {
    console.log("admin");
});
router.post("/login", admin_controller_1.signInAdmin);
router.post("/signup", admin_controller_1.signUpAdmin);
exports.default = router;
