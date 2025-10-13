import express from "express";
import multer from "multer";
import {
  getSliders,
  createSlider,
  updateSlider,
  deleteSlider,
} from "../controllers/sliderController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getSliders);
router.post("/", upload.single("image"), createSlider);
router.put("/:id", upload.single("image"), updateSlider);
router.delete("/:id", deleteSlider);

export default router;
