import express from "express";
import { handleGoogleLogin,getAllUsers ,deleteUser,addToCart,
  removeFromCart,
  getUserCart,
  clearCart,} from "../controllers/userController.js";

const router = express.Router();

// POST /api/users/login
router.post("/login", handleGoogleLogin);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.post("/cart/add", addToCart);
router.post("/cart/remove", removeFromCart);
router.get("/cart/:uid", getUserCart);
router.post("/cart/clear", clearCart);
export default router;
