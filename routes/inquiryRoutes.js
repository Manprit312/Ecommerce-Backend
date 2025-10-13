import express from "express";
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "../controllers/inquiryController.js";

const router = express.Router();

router.post("/", createInquiry); // from website contact form
router.get("/", getInquiries); // admin view
router.put("/:id/status", updateInquiryStatus);
router.delete("/:id", deleteInquiry);

export default router;
