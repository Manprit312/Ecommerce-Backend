import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==================== AUTH ====================

// ✅ REGISTER admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All required fields missing" });

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      email,
      password: hashed,
      phone,
      address,
    });

    await newAdmin.save();
    res.status(201).json({ message: "✅ Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ LOGIN admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "✅ Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        address: admin.address,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ VERIFY TOKEN
export const verifyAdmin = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ GET LOGGED-IN ADMIN PROFILE
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== CRUD ====================

// ✅ Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update admin info (name, phone, email, address)
export const updateAdmin = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.phone = phone || admin.phone;
    admin.address = address || admin.address;

    await admin.save();
    res.status(200).json({ message: "✅ Admin updated successfully", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update password
export const updateAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    await admin.save();

    res.status(200).json({ message: "✅ Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete admin
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "🗑️ Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
