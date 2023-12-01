import express from "express";
import {
    fetchGuestController, fetchOccupantController
} from "../controllers/userController.js";
const router = express.Router();

//fetch GuetsList
router.get("/fetchGuest", fetchGuestController);
router.get("/fetchOccupant", fetchOccupantController);


export default router;