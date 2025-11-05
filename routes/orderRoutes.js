import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderDetails,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// ✅ ORDER MATTERS! More specific route first

router.get("/user/:email", getOrdersByUser); // must be before :id

router.post("/create", createOrder);         // POST /api/orders/create
router.get("/", getAllOrders);               // GET /api/orders
router.get("/:id", getOrderDetails);         // GET /api/orders/64323sdf
router.patch("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
