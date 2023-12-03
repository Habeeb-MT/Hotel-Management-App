import express from "express";
import {
    fetchGuestController, fetchReportController, fetchOccupantController
} from "../controllers/userController.js";
const router = express.Router();

//fetch GuetsList
router.get("/fetchGuest", fetchGuestController);
//fetch report
router.get("/fetchReport", fetchReportController);
router.get("/fetchOccupant", fetchOccupantController);


export default router;