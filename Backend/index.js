const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");
const {connectToDatabase} = require("./db.js")
require("dotenv").config();

const app = express();

mongoose.set("bufferCommands", false);

// Middleware
app.use(cors());
app.use(express.json());

// CONNECT DB BEFORE ROUTES
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/s3", require("./routes/AWSS3"));
app.use("/api/products", require("./routes/product.js"));
app.use("/api/messages", require("./routes/message.js"));
app.use("/api/transactions", require("./routes/transaction"));
app.use("/api/get", require("./routes/secondaryGets"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/StudMart")
//   .then(() => {
//     console.log("Connected to MongoDB");
//     // Start server
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//   });
