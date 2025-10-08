import express from "express";
import { getProducts, getProductById, addProduct } from "../controllers/productController.js";

const router = express.Router();

// ✅ Get all products (with optional ?categories=Trending,LED)
router.get("/", getProducts);

// ✅ Get single product by ID
router.get("/:id", getProductById);

// ✅ Add new product
router.post("/", addProduct);

export default router;
