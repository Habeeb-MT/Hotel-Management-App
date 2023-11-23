import express from "express";
import { createServiceController, fetchServiceController, acceptServiceController, fetchMyServiceController, cancelServiceController, checkInServiceController, checkOutServiceController } from "../controllers/serviceController.js";
const router = express.Router();

//fetch GuetsList
router.post("/makeservice", createServiceController);
router.get("/fetchservice/:serviceType", fetchServiceController);
router.put("/acceptBooking", acceptServiceController);
router.put("/cancelBooking", cancelServiceController);
router.put("/checkin", checkInServiceController);
router.put("/checkout", checkOutServiceController);
router.get("/getMyService/:serviceType", fetchMyServiceController);


export default router;