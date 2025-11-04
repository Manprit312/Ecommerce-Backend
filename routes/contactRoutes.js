import express from "express";
import {
  getContactSettings,
  updateContactSettings,
} from "../controllers/contactController.js";

const router = express.Router();

// GET -> Fetch contact info (email, phone, address)
router.get("/contact-settings", getContactSettings);

// PUT -> Update contact info
router.put("/contact-settings", updateContactSettings);

export default router;
