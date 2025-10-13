import express from "express";
import { registerAdmin, loginAdmin, verifyAdmin } from "../controllers/adminController.js";
import { getAdminProfile } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/verify", verifyAdmin);
router.get("/me", verifyToken, getAdminProfile);
export default router;
