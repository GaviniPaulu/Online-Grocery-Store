import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET products with optional pagination
// Example: /api/products?page=1&limit=20
router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 50 } = req.query; // default limit = 50
    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 50;

    const skipAmount = (page - 1) * limit;

    // Get total count for pagination
    const total = await Product.countDocuments();

    // Fetch products with limit and skip
    const products = await Product.find({})
      .skip(skipAmount)
      .limit(limit);

    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit
    });

  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

