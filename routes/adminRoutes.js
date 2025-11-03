import express from "express";
import {
  registerAdmin,
  loginAdmin,
  verifyAdmin,
  getAdminProfile,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  updateAdminPassword,
  deleteAdmin,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Auth
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/verify", verifyAdmin);
router.get("/me", protectAdmin, getAdminProfile);

// ✅ CRUD
router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.put("/:id/password", updateAdminPassword);
router.delete("/:id", deleteAdmin);

export default router;
