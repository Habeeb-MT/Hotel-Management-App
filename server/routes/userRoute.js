import express from "express";
import {
    fetchGuestController,fetchReportController
} from "../controllers/userController.js";
const router = express.Router();

//fetch GuetsList
router.get("/fetchGuest", fetchGuestController);
//fetch report
router.get("/fetchReport", fetchReportController);

export default router;