import cloudinary from "../config/cloudinary.js";
import Logo from "../models/logoModel.js";
import { uploadFromBuffer } from "../utils/uploadFromBuffer.js";

// ✅ Upload or Replace Logo (only one allowed)
export const uploadOrUpdateLogo = async (req, res) => {
  try {
    const { description } = req.body; // <--- Extracting description

    if (!req.file && !description) {
      return res.status(400).json({ message: "No file or description received" });
    }

    let uploadedUrl = null;

    // 🧩 If file exists, upload to cloudinary
    if (req.file) {
      const upload = await uploadFromBuffer(req.file.buffer, "image");
      if (!upload?.secure_url) throw new Error("Cloudinary upload failed");
      uploadedUrl = upload.secure_url;
    }

    // 🧹 Find existing logo entry
    const existingLogo = await Logo.findOne();

    if (existingLogo) {
      // If new image uploaded → delete old one & update
      if (uploadedUrl) {
        try {
          const parts = existingLogo.logoUrl.split("/");
          const publicIdWithExt = parts.slice(-2).join("/");
          const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");

          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.warn("⚠️ Failed to delete old logo:", err.message);
        }

        existingLogo.logoUrl = uploadedUrl;
      }

      // ✅ Update description if provided
      if (description !== undefined) {
        existingLogo.description = description;
      }

      await existingLogo.save();

      return res.status(200).json({
        message: "✅ Logo updated successfully",
        logoUrl: existingLogo.logoUrl,
        description: existingLogo.description,
      });
    }

    // ✅ If no logo exists, create new
    const newLogo = await Logo.create({
      logoUrl: uploadedUrl,
      description: description || "",
    });

    res.status(201).json({
      message: "✅ Logo uploaded successfully",
      logoUrl: newLogo.logoUrl,
      description: newLogo.description,
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
