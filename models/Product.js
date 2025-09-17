// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // path to public/images/
  description: { type: String, default: "" } // optional description
});

const Product = mongoose.model("Product", productSchema);
export default Product;
