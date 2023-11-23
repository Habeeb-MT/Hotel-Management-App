import express from "express";
import { createInvoiceController } from "../controllers/invoiceController.js";
import { fetchInvoiceController } from "../controllers/invoiceController.js";
const router = express.Router();


router.post("/makeinvoice", createInvoiceController);
router.get("/fetchinvoice/:invoiceID", fetchInvoiceController);


export default router;