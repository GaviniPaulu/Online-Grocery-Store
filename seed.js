import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// List of 10 products
const products = [
  { name: "Apple", price: 120, description: "Fresh and juicy apples", image: "/images/apple.jpg" },
  { name: "Banana", price: 60, description: "Sweet ripe bananas", image: "/images/banana.jpg" },
  { name: "Milk", price: 50, description: "Fresh cow milk", image: "/images/milk.jpg" },
  { name: "Tomato", price: 80, description: "Fresh farm tomatoes", image: "/images/tomato.jpg" },
  { name: "Potato", price: 40, description: "Organic potatoes", image: "/images/potato.jpg" },
  { name: "Onion", price: 70, description: "Red onions", image: "/images/onion.jpg" },
  { name: "Carrot", price: 90, description: "Crunchy carrots", image: "/images/carrot.jpg" },
  { name: "Orange", price: 110, description: "Juicy oranges", image: "/images/orange.jpg" },
  { name: "Cucumber", price: 55, description: "Fresh cucumbers", image: "/images/cucumber.jpg" },
  { name: "Eggs", price: 150, description: "Pack of 12 eggs", image: "/images/eggs.jpg" }
];

const seedProducts = async () => {
  try {
    // Remove existing products
    await Product.deleteMany({});
    console.log("🗑️ Existing products removed");

    // Insert 10 products
    await Product.insertMany(products);
    console.log("✅ 10 Products seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding products:", err);
  } finally {
    mongoose.disconnect();
  }
};

seedProducts();
