import express from "express";
import {
    fetchGuestController, fetchReportController, fetchOccupantController, fetchUserController, updateUserController
} from "../controllers/userController.js";
const router = express.Router();

//fetch GuetsList
router.get("/fetchGuest", fetchGuestController);

// fetch user
router.get("/fetchUser", fetchUserController);

// fetch user
router.put("/updateUser", updateUserController);

// fetch occupant
router.get("/fetchOccupant", fetchOccupantController);



//fetch report
router.get("/fetchReport", fetchReportController);


export default router;