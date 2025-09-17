import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Create order
router.post("/", async (req, res) => {
  const { userId, products, totalPrice } = req.body;
  const order = new Order({ user: userId, products, totalPrice });
  await order.save();
  res.json(order);
});

// Get user orders
router.get("/:userId", async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate("products.product");
  res.json(orders);
});

export default router;
