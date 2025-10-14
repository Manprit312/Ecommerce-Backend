import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder,
  getOrderDetails
} from "../controllers/orderController.js";

const router = express.Router();

// Public (frontend)
router.post("/", createOrder);

// Admin
router.get("/details/:id", getOrderDetails);
router.get("/", getAllOrders);
router.get("/:email", getOrdersByUser);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
