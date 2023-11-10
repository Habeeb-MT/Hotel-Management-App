import express from "express";
import {
    registerController,
} from "../controllers/roomController.js";
const router = express.Router();

router.post("/addroom", registerController);


export default router;