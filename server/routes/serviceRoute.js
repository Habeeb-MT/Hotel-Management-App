import express from "express";
import { createServiceController, fetchServiceController, acceptServiceController } from "../controllers/serviceController.js";
const router = express.Router();

//fetch GuetsList
router.post("/makeservice", createServiceController);
router.get("/fetchservice/:serviceType", fetchServiceController);
router.put("/acceptBooking", acceptServiceController);


export default router;