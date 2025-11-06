import Order from "../models/orderModel.js";

// ✅ Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      pincode,
      items,
      subtotal,
      totalAmount,
      paymentMethod,
    } = req.body;

    if (!name || !email || !phone || !address || !city || !pincode || !items) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await Order.create({
      customerName: name,
      email,
      phone,
      address,
      city,
      pincode,
      items,
      subtotal,
      totalAmount,
      paymentMethod: paymentMethod || "Cash on Delivery",
      paymentStatus: paymentMethod === "Razorpay" ? "Paid" : "Pending", // ✅ Add thi
    });

    res.status(201).json({
      message: "✅ Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

// ✅ Get all orders (for Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};
export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch order details", error: error.message });
  }
};


// ✅ Monthly Sales Report
export const getMonthlyReport = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (month === undefined || year === undefined) {
      return res.status(400).json({ message: "Month & Year are required" });
    }

  const startDate = new Date(year, Number(month) - 1, 1);
const endDate = new Date(year, Number(month), 1);

    const orders = await Order.find({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalItemsSold = orders.reduce(
      (sum, o) => sum + o.items.reduce((acc, i) => acc + i.quantity, 0),
      0
    );

    res.status(200).json({
      month,
      year,
      totalOrders,
      totalRevenue,
      totalItemsSold,
      orders,
    });
  } catch (error) {
    console.error("Monthly report error:", error);
    res.status(500).json({ message: "Failed to fetch monthly report" });
  }
};




// ✅ Get orders for a specific user
export const getOrdersByUser = async (req, res) => {
  try {
    const { email } = req.params; // or use req.user.email if you use JWT middleware
console.log(email)
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch user orders", error: error.message });
  }
};

// ✅ Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
};

// ✅ Delete order (Admin)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
};
