const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", require("../routes/user.js"));
app.use("/api/s3", require("../routes/AWSS3"));
app.use("/api/products", require("../routes/product.js"));
app.use("/api/messages", require("../routes/message"));
app.use("/api/transactions", require("../routes/transaction"));
app.use("/api/get", require("../routes/secondaryGets"));
app.use("/api/test", (req, res) => {
  res.send("Server is working");
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// MongoDB connection (only connect once)
let isConnected;
async function connectToDatabase() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Ensure DB is connected before handling any route
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// Export the app as a serverless handler
module.exports = app;
module.exports.handler = serverless(app);
