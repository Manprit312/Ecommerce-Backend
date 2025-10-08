import Product from "../models/productModel.js";

// ✅ GET all products (with optional category filter)
export const getProducts = async (req, res) => {
  try {
    const { categories } = req.query;
    let filter = {};

    if (categories) {
      const categoryArray = categories.split(",");
      filter.categories = { $in: categoryArray };
    }

    const products = await Product.find(filter);
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
export const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Error adding product:", err.message);
    res.status(400).json({ message: err.message });
  }
};
