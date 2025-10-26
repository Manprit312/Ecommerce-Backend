import mongoose from "mongoose";

// 🛍️ Cart item sub-schema
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // ✅ reference to Product model
      required: true,
    },
    name: { type: String }, // optional, store product name snapshot
    price: { type: Number }, // optional, store product price at time of adding
    image: { type: String }, // optional thumbnail for quick display
    quantity: { type: Number, default: 1, min: 1 },
  },
  { _id: false } // prevents generating _id for each cart item
);

// 👤 User schema
const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    displayName: { type: String },
    email: { type: String, required: true },
    photoURL: { type: String },
    lastLogin: { type: Date, default: Date.now },
    loginCount: { type: Number, default: 1 },

    // 🛒 Cart section
    cart: {
      items: [cartItemSchema],
      totalCount: { type: Number, default: 0 }, // total items in cart
    },
  },
  { timestamps: true }
);

// 🧠 Automatically update totalCount before save
userSchema.pre("save", function (next) {
  if (this.cart && this.cart.items) {
    this.cart.totalCount = this.cart.items.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );
  }
  next();
});

export default mongoose.model("User", userSchema);
