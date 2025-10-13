import express from "express";
import { handleGoogleLogin,getAllUsers ,deleteUser} from "../controllers/userController.js";

const router = express.Router();

// POST /api/users/login
router.post("/login", handleGoogleLogin);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

export default router;
