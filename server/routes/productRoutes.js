import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  productFiltersController,
  searchProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//filter product
router.post("/product-filters", productFiltersController);

//search product
router.get("/search/:keyword", searchProductController);

export default router;