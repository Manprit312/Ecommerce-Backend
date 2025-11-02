import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
// ❌ Remove serverless-http for Render (used only on Vercel)
// import serverless from "serverless-http";

dotenv.config();
connectDB();

const allowedOrigins = [
  "https://ecommerce-website-git-main-manprit312s-projects.vercel.app/",
  "https://aryastore-frontend-six.vercel.app",
  "https://ecommerce-website-sage-theta.vercel.app",
  "https://ecommerce-backend-ceu1.onrender.com",
  "https://aryastore-website.vercel.app",
"https://ecommerce-admin-dashboard-red-two.vercel.app",
  "https://ecommerce-website-nine-orcin.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001"
];

const app = express();

// ✅ Single, strict CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("❌ CORS blocked for origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

// ✅ FIX: Use "/*" instead of "*" (compatible with Node 22)
app.options(/.*/, cors());

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log("🟢 Origin:", req.headers.origin);
  next();
});

// ✅ Base route
app.get("/", (req, res) => {
  res.send("✅ Ecommerce Backend Running on Render!");
});

// ✅ API Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/sliders", sliderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/admin", adminRoutes);

// ✅ For Render: run the app directly
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ❌ Do NOT export serverless(app) — only for Vercel
// export default serverless(app);
