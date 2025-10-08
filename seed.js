import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";
import { products } from "./data/products.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // 🔥 Step 1: Clear existing data
    await Product.deleteMany();
    console.log("🧹 Existing products deleted");

    // 🌱 Step 2: Insert fresh data
    await Product.insertMany(products);
    console.log("🌱 Products inserted successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
