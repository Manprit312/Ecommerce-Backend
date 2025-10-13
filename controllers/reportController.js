import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Inquiry from "../models/inquiryModel.js";
import dayjs from "dayjs";

export const getMonthlyReport = async (req, res) => {
  try {
    const currentDate = dayjs();
    const startOfMonth = currentDate.startOf("month").toDate();
    const endOfMonth = currentDate.endOf("month").toDate();

    // 🧾 Orders in this month
    const orders = await Order.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const pendingOrders = orders.filter((o) => o.status === "Processing").length;
    const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;
    const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;

    // 👥 New customers this month
    const newCustomers = await User.countDocuments({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // 💬 Inquiries this month
    const inquiriesReceived = await Inquiry.countDocuments({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    res.json({
      month: currentDate.format("MMMM YYYY"),
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      newCustomers,
      inquiriesReceived,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate monthly report" });
  }
};
