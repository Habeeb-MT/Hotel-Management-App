import express from "express";
import {
  productFiltersController,
  searchProductController,
  createProductController,
  fetchProductController,
  deleteProductController
} from "../controllers/productController.js";
const router = express.Router();

//filter product
router.post("/product-filters", productFiltersController);

//search product
router.get("/search/:keyword", searchProductController);

// create product
router.post("/addroom", createProductController);

// fetch rooms
router.get("/fetchrooms", fetchProductController);

// delete room
router.delete("/deleteroom/:rnumber", deleteProductController);

export default router;