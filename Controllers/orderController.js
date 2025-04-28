// controllers/orderController.js
import { Order } from "../Models/order.js"; // Adjust the import path as necessary

// Create New Order
const placeOrder = async (req, res) => {
  try {
    const { product, address, phone, paymentMethod, email } = req.body;

    if (!product || !address || !phone || !paymentMethod || !email) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newOrder = new Order({
      product,
      address,
      phone,
      paymentMethod,
      email,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Orders (optional for admin panel or testing)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrdersByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const orders = await Order.find({ email });
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching user's orders:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

export { placeOrder, getOrders ,getOrdersByEmail };
