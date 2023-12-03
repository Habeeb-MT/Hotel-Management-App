import express from "express";
import {
    getUserCount, getRoomCount, getOccupiedCount, getRequestCount
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/usercount", getUserCount);

router.get("/roomcount", getRoomCount);

router.get("/occupiedcount", getOccupiedCount);

router.get("/requestcount", getRequestCount);
export default router;