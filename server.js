import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();
const app = express();

// ------------------------
// Middleware
// ------------------------
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static assets
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views"))); // 👈 serve HTML directly

// ------------------------
// API Routes
// ------------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ------------------------
// HTML Page Routes
// ------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cart.html"));
});

// ------------------------
// 404 Page (Safe Fallback)
// ------------------------
app.use((req, res) => {
  const notFoundPath = path.join(__dirname, "views", "404.html");
  res.status(404).sendFile(notFoundPath, (err) => {
    if (err) {
      // if 404.html does not exist → fallback JSON
      res.status(404).json({ message: "Page not found" });
    }
  });
});

// ------------------------
// Error Handler
// ------------------------
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// ------------------------
// Start server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("======================================");
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
  console.log("======================================");
});
