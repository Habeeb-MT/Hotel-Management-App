import express from "express";
import { createRoomServiceController, fetchRoomServiceController, acceptRoomServiceController, fetchMyRequstedRoomServiceController } from "../controllers/serviceController.js";
const router = express.Router();


router.post("/makeroomservice", createRoomServiceController);
router.get("/fetchroomservice", fetchRoomServiceController);
router.put("/acceptroomservice", acceptRoomServiceController);
router.get("/fetchrequestedroomservice", fetchMyRequstedRoomServiceController);


export default router;