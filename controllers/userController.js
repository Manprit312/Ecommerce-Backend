import User from "../models/userModel.js";
import Product from "../models/productModel.js";

// 🔹 Create or update user on Google login
export const handleGoogleLogin = async (req, res) => {
  try {
    const { uid, displayName, email, photoURL } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ uid });

    if (existingUser) {
      // Update login count + last login
      existingUser.displayName = displayName;
      existingUser.photoURL = photoURL;
      existingUser.lastLogin = new Date();
      existingUser.loginCount += 1;
      await existingUser.save();

      return res.status(200).json({
        message: "User login updated",
        user: existingUser,
      });
    }

    // Create new user
    const newUser = await User.create({
      uid,
      displayName,
      email,
      photoURL,
    });

    return res.status(201).json({
      message: "New user created",
      user: newUser,
    });
  } catch (error) {
    console.error("Login tracking failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ lastLogin: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
// DELETE user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};


// -----------------------------------------------------------------------------
// 🛒 CART CONTROLLERS
// -----------------------------------------------------------------------------

// ✅ Add to Cart
export const addToCart = async (req, res) => {
try {
    const { uid, productId, quantity, image ,shippingCharge} = req.body;

    if (!uid || !productId)
      return res.status(400).json({ message: "Missing user or product info" });

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const qtyToAdd = quantity && quantity > 0 ? quantity : 1; // ✅ always use frontend quantity

    const existingItem = user.cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += qtyToAdd; // ✅ increase by given quantity
    } else {
      user.cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        image: image ?? product.images?.[0],
        quantity: qtyToAdd,     // ✅ set selected quantity
        shippingCharge: shippingCharge ?? product.shippingCharge ?? 0,
      });
    }

    // ✅ recalc total
     user.cart.totalCount = user.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // ✅ Update total amount (products + shipping)
    user.cart.totalAmount = user.cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity + (item.shippingCharge || 0),
      0
    );

    await user.save();

    res.status(200).json({ message: "Added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error adding to cart" });
  }
};

// ✅ Remove Item from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { uid, productId } = req.body;

    if (!uid || !productId) {
      return res.status(400).json({ message: "Missing user or product ID" });
    }

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    let itemRemoved = false;

    // 🧩 Find the product in cart
    user.cart.items = user.cart.items.map((item) => {
      if (String(item.productId) === String(productId)) {
        if (item.quantity > 1) {
          // ➖ Decrease quantity by 1
          item.quantity -= 1;
        } else {
          // 🚮 Remove item later
          itemRemoved = true;
          return null;
        }
      }
      return item;
    }).filter(Boolean); // removes null if deleted

    // 🧮 Recalculate total count
    user.cart.totalCount = user.cart.items.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    user.markModified("cart");
    await user.save();

    res.status(200).json({
      message: itemRemoved
        ? "Item removed completely from cart"
        : "Item quantity decreased by 1",
      cart: user.cart,
    });
  } catch (error) {
    console.error("❌ Error removing from cart:", error);
    res.status(500).json({ message: "Server error removing from cart" });
  }
};



// ✅ Get User Cart (with populated products)
export const getUserCart = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({ uid }).populate(
      "cart.items.productId",
      "name price images inStock stockQuantity"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// ✅ Clear Cart
export const clearCart = async (req, res) => {
  try {
    const { uid } = req.body;
    const user = await User.findOne({ uid });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart.items = [];
    user.cart.totalCount = 0;

    await user.save();
    res.status(200).json({ message: "Cart cleared successfully", cart: user.cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
