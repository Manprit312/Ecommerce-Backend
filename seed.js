import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";
import { products } from "./data/products.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Product.deleteMany(); // clear old data
    console.log("🗑️ Old products removed");

    await Product.insertMany(products);
    console.log("🌱 Products inserted successfully!");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
