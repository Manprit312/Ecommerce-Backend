
import cloudinary from "../config/cloudinary.js";
import Logo from "../models/logoModel.js";
import { uploadFromBuffer } from "../utils/uploadFromBuffer.js";

// ✅ Upload or Replace Logo (only one allowed)
export const uploadOrUpdateLogo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // 🧩 Upload to Cloudinary
    const upload = await uploadFromBuffer(req.file.buffer, "image");
    if (!upload?.secure_url) throw new Error("Cloudinary upload failed");

    // 🧹 Find existing logo (there should be only one)
    const existingLogo = await Logo.findOne();

    if (existingLogo) {
      // Delete old logo from Cloudinary
      try {
        const parts = existingLogo.logoUrl.split("/");
        const publicIdWithExt = parts.slice(-2).join("/");
        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.warn("⚠️ Failed to delete old logo:", err.message);
      }

      // Replace with new URL
      existingLogo.logoUrl = upload.secure_url;
      await existingLogo.save();

      return res.status(200).json({
        message: "✅ Logo replaced successfully",
        logoUrl: existingLogo.logoUrl,
      });
    }

    // If no logo exists, create a new one
    const newLogo = await Logo.create({ logoUrl: upload.secure_url });
    res.status(201).json({
      message: "✅ Logo uploaded successfully",
      logoUrl: newLogo.logoUrl,
    });
  } catch (err) {
    console.error("❌ Error uploading logo:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get current logo
export const getLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne().sort({ createdAt: -1 });
    if (!logo) return res.status(404).json({ message: "No logo found" });
    res.status(200).json(logo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete logo (optional)
export const deleteLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne();
    if (!logo) return res.status(404).json({ message: "No logo found" });

    // delete from Cloudinary
    try {
      const parts = logo.logoUrl.split("/");
      const publicIdWithExt = parts.slice(-2).join("/");
      const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.warn("⚠️ Failed to delete image from Cloudinary:", err.message);
    }

    await Logo.findByIdAndDelete(logo._id);
    res.status(200).json({ message: "🗑️ Logo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
