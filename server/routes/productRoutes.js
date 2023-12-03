import express from "express";
import {
  productFiltersController,
  searchProductController,
  createProductController,
  fetchProductController,
  deleteProductController,
  editProductController,
  addGuestController,
  makeServiceController,
  fetchReserveController,
  acceptReserveController,
  checkInServiceController,
  checkOutServiceController,
  fetchMyBookingController,
  fetchMyCheckedInServiceController,
  cancelMyBookingController,
  rejectBookingController
} from "../controllers/productController.js";
const router = express.Router();

//filter product
router.get("/product-filters", productFiltersController);

//search product
router.get("/search/:keyword", searchProductController);

// create product
router.post("/addroom", createProductController);

// fetch rooms
router.get("/fetchrooms", fetchProductController);

// delete room
router.delete("/deleteroom/:rnumber", deleteProductController);

// update room
router.put("/editroom/:rnumber", editProductController);

// add guest
router.post("/addguest", addGuestController);

router.post("/reserve", makeServiceController);

router.get("/fetchreserve/", fetchReserveController);

router.put("/acceptBooking", acceptReserveController);

router.put("/rejectBooking", rejectBookingController);



router.put("/cancelBooking", cancelMyBookingController);

router.put("/checkin", checkInServiceController);

router.put("/checkout", checkOutServiceController);

router.get("/getMyService/:serviceType", fetchMyBookingController);

router.get("/fetchcheckedinrooms", fetchMyCheckedInServiceController);




export default router;