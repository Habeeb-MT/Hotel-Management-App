import express from "express";
import {
    getUserCount, getRoomCount
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/usercount", getUserCount);

router.get("/roomcount", getRoomCount);


export default router;