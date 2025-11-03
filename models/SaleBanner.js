import mongoose from "mongoose";

const saleBannerSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.SaleBanner || mongoose.model("SaleBanner", saleBannerSchema);
