import Inquiry from "../models/inquiryModel.js";

// ✅ Create new inquiry (from website)
export const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ message: "All fields are required" });

    const inquiry = await Inquiry.create({ name, email, message });
    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit inquiry" });
  }
};

// ✅ Get all inquiries (for admin)
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
};

// ✅ Update inquiry status (mark as Read / Replied)
export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });

    res.json({ message: "Status updated", inquiry });
  } catch (error) {
    res.status(500).json({ message: "Failed to update inquiry" });
  }
};

// ✅ Delete inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await Inquiry.findByIdAndDelete(id);
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete inquiry" });
  }
};
