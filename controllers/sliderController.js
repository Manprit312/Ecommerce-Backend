import Slider from "../models/sliderModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ✅ Get all sliders
export const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ createdAt: -1 });
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sliders" });
  }
};

// ✅ Create slider (with Cloudinary upload)
export const createSlider = async (req, res) => {
  try {
    const { title, subtitle, description, product, tag } = req.body;
    let imageUrl = "";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "sliders",
      });
      imageUrl = uploadResult.secure_url;
      fs.unlinkSync(req.file.path); // remove local temp file
    }

    const newSlider = await Slider.create({
      title,
      subtitle,
      description,
      product,
      tag,
      image: imageUrl,
    });

    res.status(201).json(newSlider);
  } catch (error) {
    res.status(500).json({ message: "Failed to create slider", error: error.message });
  }
};

// ✅ Update slider (replace old Cloudinary image if new one uploaded)
export const updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, product, tag } = req.body;

    const slider = await Slider.findById(id);
    if (!slider) return res.status(404).json({ message: "Slider not found" });

    let imageUrl = slider.image;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "sliders",
      });
      imageUrl = uploadResult.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updated = await Slider.findByIdAndUpdate(
      id,
      { title, subtitle, description, product, tag, image: imageUrl },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update slider", error: error.message });
  }
};

// ✅ Delete slider (and Cloudinary image if available)
export const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findById(id);
    if (!slider) return res.status(404).json({ message: "Slider not found" });

    // Extract public_id from Cloudinary URL
    if (slider.image?.includes("cloudinary")) {
      const publicId = slider.image.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`sliders/${publicId}`);
    }

    await Slider.findByIdAndDelete(id);
    res.json({ message: "Slider deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete slider", error: error.message });
  }
};
