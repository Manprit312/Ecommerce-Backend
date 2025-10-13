import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "./models/orderModel.js";
import fs from "fs";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const data = JSON.parse(fs.readFileSync("./mockOrders.json", "utf8"));

(async () => {
  await Order.deleteMany();
  await Order.insertMany(data);
  console.log("✅ Orders seeded successfully");
  process.exit();
})();
