// scripts/fixProductCategories.js

import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";

const MONGO_URI = "mongodb+srv://aryaenterprises499_db_user:zEHBzVJV4xQirmdn@ecommercecluster.tjgerxq.mongodb.net/?retryWrites=true&w=majority&appName=EcommerceCluster";
// scripts/seedProducts.js
import mongoose from "mongoose";
import dotenv from "dotenv";


import { products } from "./data/products.js"; // adjust path if needed

dotenv.config();

async function seedProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully!");

    // Clear old data
    await Product.deleteMany();
    console.log("🧹 Cleared existing products.");

    // Fetch all categories once
    const allCategories = await Category.find({});
    const categoryMap = {};
    allCategories.forEach((cat) => {
      categoryMap[cat.name.toLowerCase()] = cat._id;
    });

    console.log(`📦 Found ${allCategories.length} categories in DB`);

    // Convert product category names → ObjectIds
    const productDocs = [];

    for (const p of products) {
      const mappedCategoryIds = (p.categories || [])
        .map((name) => categoryMap[name.toLowerCase()])
        .filter(Boolean); // remove undefined

      if (mappedCategoryIds.length === 0) {
        console.warn(`⚠️ No matching categories found for product: ${p.name}`);
      }

      productDocs.push({
        name: p.name,
        price: p.price,
        categories: mappedCategoryIds,
        rating: p.rating,
        reviews: p.reviews,
        description: p.description,
        specs: p.specs,
        images: p.images,
        inStock: p.inStock,
        badge: p.badge,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert into DB
    await Product.insertMany(productDocs);
    console.log(`✨ Seeded ${productDocs.length} products successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedProducts();
