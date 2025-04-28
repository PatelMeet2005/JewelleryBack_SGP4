// routes/orderRoutes.js
import express from "express";
import { placeOrder, getOrders ,getOrdersByEmail} from "../Controllers/orderController.js";

const router = express.Router();

// Route to place a new order
router.post("/", placeOrder);

// Route to get all orders (admin/test)
router.get("/", getOrders);

// Route to get orders by email (user-specific)
router.get("/:email", getOrdersByEmail);

export default router;
