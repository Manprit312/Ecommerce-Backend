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
      material: String,
      dimensions: String,
      weight: String,
      power: String,
      sensor: String,
      colors: String,
      features: [String],
    },
    images: [String],
    inStock: { type: Boolean, default: true },
       stockQuantity: { type: Number, default: 0, min: 0 },
    badge: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
