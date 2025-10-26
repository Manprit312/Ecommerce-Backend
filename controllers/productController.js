import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import Category from "../models/categoryModel.js";
import streamifier from "streamifier";
// ✅ GET all products (with optional category filter)

export const getProducts = async (req, res) => {
  try {
    const { categories } = req.query;
    let filter = {};

    if (categories) {
      // Support multiple categories like ?categories=Trending,Decor
      const categoryNames = categories.split(",").map((c) => c.trim());

      // 🔍 Find matching Category documents by name
      const categoryDocs = await Category.find({
        name: { $in: categoryNames },
      });

      if (!categoryDocs.length) {
        // No category found => return empty array instead of 500
        return res.status(200).json([]);
      }

      // ✅ Extract ObjectIds
      const categoryIds = categoryDocs.map((cat) => cat._id);

      // Filter products by matching category ObjectIds
      filter.categories = { $in: categoryIds };
    }

    // ✅ Fetch products and populate categories
    const products = await Product.find(filter).populate("categories");

    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};
// ✅ GET single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ POST add a new product


export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🧹 Delete associated images from Cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map(async (url) => {
        try {
          // Extract Cloudinary public_id from URL
          // Example: https://res.cloudinary.com/demo/image/upload/v1234/foldername/filename.jpg
          const parts = url.split("/");
          const publicIdWithExt = parts.slice(-2).join("/"); // foldername/filename.jpg
          const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ""); // remove .jpg or .png
          
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error("⚠️ Error deleting image from Cloudinary:", err.message);
        }
      });

      await Promise.all(deletePromises);
    }

    // 🗑️ Delete product from DB
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "✅ Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};



const uploadFromBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uniqueName = `product_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products", public_id: uniqueName, resource_type: "image", overwrite: false },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
export const addProduct = async (req, res) => {
  try {
    // Parse JSON fields that come as strings from FormData
    const {
      name,
      price,
      description,
      categories,
      specs,
      rating,
      reviews,
      inStock,
      badge,
      stockQuantity, 
    } = req.body;

    // Handle Cloudinary uploads from buffers
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      console.log("📤 Uploading images:", req.files.map((f) => f.originalname));

      const uploads = await Promise.allSettled(
        req.files
          .filter((file) => file?.buffer && file.buffer.length > 0)
          .map((file) => uploadFromBuffer(file.buffer))
      );

      // Log any failures
      uploads.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`❌ Failed to upload file ${req.files[index]?.originalname}:`, result.reason);
        }
      });

      // Extract successful uploads
      imageUrls = uploads
        .filter((result) => result.status === "fulfilled" && result.value?.secure_url)
        .map((result) => result.value.secure_url);

      console.log(`✅ Uploaded ${imageUrls.length}/${req.files.length} images successfully`);
    }

    // Construct new product data
   let categoryIds = [];
if (categories) {
  const categoryNames = JSON.parse(categories); // ["Trending", "Romantic"]
  const foundCategories = await Category.find({ name: { $in: categoryNames } });
  categoryIds = foundCategories.map((cat) => cat._id);
}

const productData = {
  name,
  price: parseFloat(price),
  description,
  categories: categoryIds, // ✅ store ObjectIds dynamically
  specs: specs ? JSON.parse(specs) : {},
  rating: rating ? parseFloat(rating) : 0,
  reviews: reviews ? parseInt(reviews) : 0,
  inStock: inStock === "true" || inStock === true,
  badge,
  images: imageUrls,
  stockQuantity: Number(stockQuantity) || 0, // ✅ added

};

    // Save product
    const newProduct = new Product(productData);
    await newProduct.save();

    console.log("✅ Product created with", imageUrls.length, "images");

    // Return final saved product
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Error adding product:", err.message);
    res.status(400).json({ message: err.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract fields from FormData
    const {
      name,
      price,
      description,
      categories,
      specs,
      rating,
      reviews,
      inStock,
      stockQuantity,
      badge,
      existingImages, // from frontend (JSON string)
    } = req.body;

    // ✅ Parse fields safely
    const parsedCategories = categories ? JSON.parse(categories) : existingProduct.categories;
    const parsedSpecs = specs ? JSON.parse(specs) : existingProduct.specs;
    const keptImages = existingImages ? JSON.parse(existingImages) : existingProduct.images;

    let updatedImages = [...keptImages]; // start with kept ones

    // ✅ Upload new images (if any)
    let newImageUrls = [];
    if (req.files && req.files.length > 0) {
      console.log("📤 Uploading new images:", req.files.map((f) => f.originalname));
      console.log("📋 Files info:", req.files.map(f => ({
        name: f.originalname,
        size: f.size,
        mimetype: f.mimetype,
        hasBuffer: !!f.buffer,
        bufferLength: f.buffer?.length
      })));

      const filesToUpload = req.files.filter((file) => file?.buffer && file.buffer.length > 0);
      console.log(`🔍 Files to upload after filter: ${filesToUpload.length}/${req.files.length}`);

      const uploaded = await Promise.allSettled(
        filesToUpload.map((file) => uploadFromBuffer(file.buffer))
      );

      console.log("📦 Upload results:", uploaded.map((r, i) => ({
        file: filesToUpload[i]?.originalname,
        status: r.status,
        hasValue: r.status === "fulfilled" && !!r.value,
        hasSecureUrl: r.status === "fulfilled" && !!r.value?.secure_url,
        error: r.status === "rejected" ? r.reason?.message : null
      })));

      // Log any upload failures
      uploaded.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`❌ Failed to upload file ${filesToUpload[index]?.originalname}:`, result.reason);
        } else if (result.status === "fulfilled" && !result.value?.secure_url) {
          console.warn(`⚠️ Upload succeeded but no secure_url for ${filesToUpload[index]?.originalname}:`, result.value);
        }
      });

      // Extract successful uploads only
      newImageUrls = uploaded
        .filter((result) => result.status === "fulfilled" && result.value?.secure_url)
        .map((result) => result.value.secure_url);

      console.log("✅ New image URLs uploaded:", newImageUrls);
      console.log(`📊 Upload results: ${newImageUrls.length}/${req.files.length} successful`);

      if (newImageUrls.length > 0) {
        // Combine kept images with new ones
        const combined = [...keptImages, ...newImageUrls];
        updatedImages = [...new Set(combined)]; // avoid duplicates
        
        console.log("🔍 DEBUG INFO:");
        console.log("  - Kept images:", keptImages);
        console.log("  - New images:", newImageUrls);
        console.log("  - Combined before Set:", combined);
        console.log("  - Final after Set:", updatedImages);
        console.log("  - Length change:", combined.length, "->", updatedImages.length);
      }
    }

    // ✅ Delete removed images from Cloudinary
    const removedImages = existingProduct.images.filter((img) => !keptImages.includes(img));

    if (removedImages.length > 0) {
      console.log("🗑️ Deleting old Cloudinary images:", removedImages.length);

      await Promise.allSettled(
        removedImages.map(async (url) => {
          try {
            const parts = url.split("/");
            const publicIdWithExt = parts.slice(-2).join("/"); // folder/file.jpg
            const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ""); // remove .jpg
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.warn("⚠️ Failed to delete Cloudinary image:", err.message);
          }
        })
      );
    }

    // ✅ Update product in MongoDB
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: name || existingProduct.name,
        price: price ? parseFloat(price) : existingProduct.price,
        description: description || existingProduct.description,
        categories: parsedCategories,
        specs: parsedSpecs,
        rating: rating ? parseFloat(rating) : existingProduct.rating,
        reviews: reviews ? parseInt(reviews) : existingProduct.reviews,
       stockQuantity:
  stockQuantity !== undefined
    ? Number(stockQuantity)
    : existingProduct.stockQuantity,
inStock:
  stockQuantity !== undefined
    ? Number(stockQuantity) > 0
    : inStock !== undefined
    ? inStock === "true" || inStock === true
    : existingProduct.inStock,
        badge: badge || existingProduct.badge,
        images: updatedImages, // ✅ kept + new
      },
      { new: true }
    );

    console.log({
      keptImagesCount: keptImages.length,
      newImagesUploaded: newImageUrls.length,
      totalImagesAfter: updatedImages.length,
      finalImages: updatedImages,
    });

    res.status(200).json({
      message: "✅ Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("❌ Error updating product:", err.message);
    res.status(500).json({ message: err.message });
  }
};