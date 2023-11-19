import express from "express";
import {
    fetchGuestController
} from "../controllers/userController.js";
const router = express.Router();

//fetch GuetsList
router.get("/fetchGuest", fetchGuestController);


export default router;