import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // ✅ linked to Category model
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    description: { type: String },
  specs: {
      type: Map,        // <-- dynamic object
      of: String,       // <-- key-value pairs
      default: {}
    },
    images: [String],
    inStock: { type: Boolean, default: true },
    stockQuantity: { type: Number, default: 0, min: 0 },
    model3D: { type: String },
    badge: String,
    offer: { type: String, default: "" },
    shipping: { type: String, default: "Free Shipping" },
    returnPolicy: { type: String, default: "Easy Returns" },
    warranty: { type: String, default: "1 Year Warranty" }

  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
