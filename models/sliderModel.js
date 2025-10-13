import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    product: { type: String, required: true },
    tag: { type: String },
    image: { type: String, required: true }, // URL of image
  },
  { timestamps: true }
);

export default mongoose.model("Slider", sliderSchema);
