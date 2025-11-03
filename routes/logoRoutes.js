import express from "express";
import multer from "multer";
import { uploadOrUpdateLogo, getLogo, deleteLogo } from "../controllers/logoController.js";

const router = express.Router();
const upload = multer();

// ✅ Only one logo allowed
router.post("/upload", upload.single("file"), uploadOrUpdateLogo); // Upload or replace
router.get("/", getLogo); // Get current logo
router.delete("/", deleteLogo); // Delete logo

export default router;
