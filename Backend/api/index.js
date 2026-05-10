const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectToDatabase() {
  // Return existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if not exists
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("====================================");
        console.log("MongoDB Connected Successfully");
        console.log("====================================");

        return mongooseInstance;
      })
      .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}


let isAppInitialized = false;

async function initializeApp() {
  if (isAppInitialized) return;

  // Connect DB FIRST
  await connectToDatabase();

  // Routes AFTER DB connection
  app.use("/api/users", require("../routes/user.js"));
  app.use("/api/auth", require("../routes/auth.js"));
  app.use("/api/s3", require("../routes/AWSS3"));
  app.use("/api/products", require("../routes/product.js"));
  app.use("/api/messages", require("../routes/message"));
  app.use("/api/transactions", require("../routes/transaction"));
  app.use("/api/get", require("../routes/secondaryGets"));

  // Test Route
  app.use("/api/test", (req, res) => {
    res.send("Server is working");
  });

  // Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  });

  isAppInitialized = true;
}


const handler = serverless(app);

module.exports.handler = async (req, res) => {
  await initializeApp();
  return handler(req, res);
};