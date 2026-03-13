import express from "express";
export const router = express.Router();
import { login, logout, user } from "../controller/auth.controller.js";
import { validate } from "../middleware/auth.middleware.js";
import { signUpSchema1, loginSchema1 } from "../validation/auth.validate.js";
router.post("/signup", validate(signUpSchema1), user);
router.post("/login", validate(loginSchema1), login);
router.get("/logout", logout);
