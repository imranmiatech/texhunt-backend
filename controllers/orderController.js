import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place Order (COD / bKash / Nagad)
const placeOrder = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { items, amount, address, paymentMethod } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: paymentMethod || "Cash on Delivery",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// All orders data for admin
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders: orders.reverse() });
  } catch (error) {
    console.error("All Orders Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// User order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders: orders.reverse() });
  } catch (error) {
    console.error("User Orders Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status (for admin)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, allOrders, userOrders, updateStatus };