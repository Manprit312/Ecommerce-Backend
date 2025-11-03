import SaleBanner from "../models/SaleBanner.js";
import cloudinary from "../config/cloudinary.js";

export const uploadSaleBanner = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "sale_banners", overwrite: true }
    );

    // Deactivate old banner (only 1 active at a time)
    await SaleBanner.updateMany({}, { isActive: false });

    const banner = await SaleBanner.create({
      imageUrl: result.secure_url,
      isActive: true,
    });

    res.status(200).json({ message: "Sale banner uploaded", banner });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSaleBanner = async (req, res) => {
  try {
    const banner = await SaleBanner.findOne({ isActive: true }).sort({ createdAt: -1 });
    if (!banner) return res.status(200).json({ banner: null });
    res.status(200).json({ banner });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSaleBanner = async (req, res) => {
  try {
    await SaleBanner.deleteMany({});
    res.status(200).json({ message: "All sale banners deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
