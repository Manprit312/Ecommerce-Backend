import express from "express";
import multer from "multer";
import { uploadSaleBanner, getSaleBanner, deleteSaleBanner } from "../controllers/saleBannerController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getSaleBanner);
router.post("/upload", upload.single("file"), uploadSaleBanner);
router.delete("/", deleteSaleBanner);

export default router;
