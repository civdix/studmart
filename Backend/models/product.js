const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Textbooks",
      "Electronics",
      "Furniture",
      "Clothing",
      "School Supplies",
      "Sports Equipment",
      "Musical Instruments",
      "Others",
    ],
  },
  condition: {
    type: String,
    required: true,
    enum: ["New", "Like New", "Good", "Fair", "Poor"],
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    Default: "Not specified",
  },
  status: {
    type: String,
    enum: ["Available", "Sold", "Reserved"],
    default: "Available",
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for search functionality
productSchema.index({ title: "text", description: "text" });
productSchema.index({ seller: 1 });

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;
