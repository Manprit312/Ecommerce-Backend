import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: { type: String, enum: ["frames", "lights", "other"] },
    rating: Number,
    reviews: Number,
    description: String,
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
    inStock: Boolean,
    badge: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
