import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();

// ➡️ Add item to cart
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // ⚠️ For now, we use a dummy user (replace with logged-in user later)
    const userId = "66e4a8fc7d1234567890abcd"; // put a real user _id from MongoDB

    // Find existing cart for user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json({ message: "Added to cart successfully!", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// ➡️ Get cart items
router.get("/", async (req, res) => {
  try {
    const userId = "66e4a8fc7d1234567890abcd"; // same dummy user
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) return res.json({ items: [] });

    res.json(cart.items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

export default router;
