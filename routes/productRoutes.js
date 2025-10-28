import express from "express";
import { getProducts, getProductById, updateProduct,addProduct, deleteProduct, } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
const router = express.Router();

// ✅ Get all products (with optional ?categories=Trending,LED)
router.get("/", getProducts);

// ✅ Get single product by ID
router.get("/:id", getProductById);
router.post("/", upload.array("images", 24), addProduct);

// ✅ Add new product
router.put("/:id", upload.array("images", 24), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
