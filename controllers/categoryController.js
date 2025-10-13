import Category from "../models/categoryModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadFromBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "categories" },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// ✅ Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add new category
export const addCategory = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file && req.file.buffer) {
      const upload = await uploadFromBuffer(req.file.buffer);
      imageUrl = upload.secure_url;
    }

    const { name, description } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const category = new Category({ name, description, slug, image: imageUrl });
    await category.save();

    res.status(201).json({ message: "✅ Category added", category });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    let updateData = { name, description, isActive };

    if (req.file && req.file.buffer) {
      const upload = await uploadFromBuffer(req.file.buffer);
      updateData.image = upload.secure_url;
    }

    const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "✅ Category updated", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "🗑️ Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
