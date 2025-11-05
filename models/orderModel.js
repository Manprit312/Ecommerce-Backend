import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    subtotal: Number,
    totalAmount: Number,

    status: {
      type: String,
      default: "Pending", // Pending → Processing → Delivered
    },

    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
