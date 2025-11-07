import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import Category from "../models/categoryModel.js";
import { uploadFromBuffer } from "../utils/uploadFromBuffer.js";
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




export const addProduct = async (req, res) => {
  try {
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
      offer,
      shipping,
      returnPolicy,
      warranty,
    } = req.body;

    let imageUrls = [];
    let model3DUrl = null;

    if (req.files && req.files.length > 0) {
      console.log("📤 Uploading files:", req.files.map((f) => f.originalname));

      const uploads = await Promise.allSettled(
        req.files.map((file) =>
          uploadFromBuffer(file.buffer, file.mimetype)
        )
      );

      uploads.forEach((result, i) => {
        if (result.status === "fulfilled" && result.value?.secure_url) {
          const isGLB =
            req.files[i].mimetype.includes("glb") ||
            req.files[i].originalname.endsWith(".glb");

          if (isGLB) model3DUrl = result.value.secure_url;
          else imageUrls.push(result.value.secure_url);
        } else if (result.status === "rejected") {
          console.error(`❌ Failed upload: ${req.files[i].originalname}`);
        }
      });
    }

    let categoryIds = [];
    if (categories) {
      const parsed = JSON.parse(categories);
      categoryIds = Array.isArray(parsed) ? parsed : [parsed];
    }
let formattedSpecs = {};
    if (specs) {
      const parsedSpecs = JSON.parse(specs); // expect array of objects
      if (Array.isArray(parsedSpecs)) {
        parsedSpecs.forEach(({ key, value }) => {
          if (key && value) formattedSpecs[key] = value;
        });
      }
    }
    const productData = {
      name,
      price: parseFloat(price),
      description,
      categories: categoryIds,
     specs: formattedSpecs,
      rating: rating ? parseFloat(rating) : 0,
      reviews: reviews ? parseInt(reviews) : 0,
      inStock: inStock === "true" || inStock === true,
      badge,
      offer,
      images: imageUrls,
      stockQuantity: Number(stockQuantity) || 0,
      model3D: model3DUrl,
      shipping: shipping || "Free Shipping",
      returnPolicy: returnPolicy || "Easy Returns",
      warranty: warranty || "1 Year Warranty",

    };

    const newProduct = new Product(productData);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Error adding product:", err);
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

    // Extract fields
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
      existingImages,
      offer,
      removeModel, // ✅ new flag from frontend
      shipping,
      returnPolicy,
      warranty,
    } = req.body;
 let formattedSpecs = existingProduct.specs;
    if (specs) {
      try {
        const parsedSpecs = JSON.parse(specs);
        if (Array.isArray(parsedSpecs)) {
          formattedSpecs = {};
          parsedSpecs.forEach(({ key, value }) => {
            if (key && value) formattedSpecs[key] = value;
          });
        } else {
          formattedSpecs = parsedSpecs;
        }
      } catch {
        formattedSpecs = existingProduct.specs;
      }
    }
    const parsedCategories = categories ? JSON.parse(categories) : existingProduct.categories;
    
    const keptImages = existingImages ? JSON.parse(existingImages) : existingProduct.images;

    let updatedImages = [...keptImages];
    let newImageUrls = [];
    let newModelUrl = null;

    if (req.files && req.files.length > 0) {
      console.log("🧾 Received files:", req.files.map(f => f.originalname));

      const filesToUpload = req.files.filter(
        (file) => (file?.buffer && file.buffer.length > 0) || file?.path
      );

      const uploaded = await Promise.allSettled(
        filesToUpload.map((file) => {
          const is3D =
            file.originalname.toLowerCase().endsWith(".glb") ||
            file.originalname.toLowerCase().endsWith(".gltf");

          const resourceType = is3D ? "raw" : "image"; // ✅ key difference
          return uploadFromBuffer(file.buffer, resourceType);
        })
      );

      uploaded.forEach((result, i) => {
        const file = filesToUpload[i];
        if (result.status === "fulfilled" && result.value?.secure_url) {
          const is3D =
            file.originalname.toLowerCase().endsWith(".glb") ||
            file.originalname.toLowerCase().endsWith(".gltf");

          if (is3D) newModelUrl = result.value.secure_url;
          else newImageUrls.push(result.value.secure_url);
        }
      });

      if (newImageUrls.length > 0) {
        updatedImages = [...new Set([...keptImages, ...newImageUrls])];
      }
    }


    // ✅ Handle removed images
    const removedImages = existingProduct.images.filter((img) => !keptImages.includes(img));
    if (removedImages.length > 0) {
      await Promise.allSettled(
        removedImages.map(async (url) => {
          try {
            const parts = url.split("/");
            const publicIdWithExt = parts.slice(-2).join("/");
            const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.warn("⚠️ Failed to delete Cloudinary image:", err.message);
          }
        })
      );
    }

    // ✅ Handle "Remove Model" request
    if (removeModel === "true" && existingProduct.model3D) {
      try {
        console.log("🗑️ Removing 3D model as requested...");
        const parts = existingProduct.model3D.split("/");
        const publicIdWithExt = parts.slice(-2).join("/");
        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
        await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
        existingProduct.model3D = null;
      } catch (err) {
        console.warn("⚠️ Failed to delete existing model:", err.message);
      }
    }

    // ✅ If a new 3D model is uploaded, replace old one
    if (newModelUrl && existingProduct.model3D) {
      try {
        console.log("🗑️ Deleting old 3D model (replacing with new one)...");
        const parts = existingProduct.model3D.split("/");
        const publicIdWithExt = parts.slice(-2).join("/");
        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
        await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
      } catch (err) {
        console.warn("⚠️ Failed to delete old model:", err.message);
      }
    }

    // ✅ Final update in MongoDB
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: name || existingProduct.name,
        price: price ? parseFloat(price) : existingProduct.price,
        description: description || existingProduct.description,
        categories: parsedCategories,
     specs: formattedSpecs,
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
        badge: badge ?? existingProduct.badge,


        offer: offer || existingProduct.offer,
        images: updatedImages,
        shipping: shipping || existingProduct.shipping,
        returnPolicy: returnPolicy || existingProduct.returnPolicy,
        warranty: warranty || existingProduct.warranty,
        model3D: newModelUrl
          ? newModelUrl
          : removeModel === "true"
            ? null
            : existingProduct.model3D,
      },
      { new: true },



    );

    res.status(200).json({
      message: "✅ Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("❌ Error updating product:", err.message);
    res.status(500).json({ message: err.message });
  }
};

