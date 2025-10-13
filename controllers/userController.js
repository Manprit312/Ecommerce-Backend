import User from "../models/userModel.js";

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
