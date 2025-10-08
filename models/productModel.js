import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categories: [{ type: String }], // ✅ changed from single category to array
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    description: { type: String },
    specs: {
      material: { type: String },
      dimensions: { type: String },
      weight: { type: String },
      power: { type: String },
      sensor: { type: String },
      colors: { type: String },
      features: [{ type: String }],
    },
    images: [{ type: String }], // ✅ array for multiple Cloudinary URLs
    inStock: { type: Boolean, default: true },
    badge: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
