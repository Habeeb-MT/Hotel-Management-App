import express from "express";
import {
  registerController,
  loginController,
  testController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//register
router.post("/register", registerController);
//login || post
router.post("/login", loginController);
//test routes
router.get("/test", requireSignIn, isAdmin, testController);

export default router;