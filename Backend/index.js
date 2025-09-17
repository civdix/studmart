const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/s3", require("./routes/AWSS3"));
app.use("/api/products", require("./routes/product.js"));
app.use("/api/messages", require("./routes/message"));
app.use("/api/transactions", require("./routes/transaction"));
app.use("/api/get", require("./routes/secondaryGets"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://Shivam:Studmart123Password@cluster0.oq61s6a.mongodb.net/studmart?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
