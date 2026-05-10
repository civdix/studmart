const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| MongoDB Cache
|--------------------------------------------------------------------------
*/

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("MongoDB Connected");
        return mongooseInstance;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

/*
|--------------------------------------------------------------------------
| Connect DB Middleware
|--------------------------------------------------------------------------
*/

app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Database connection failed",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/api/users", require("../routes/user.js"));
app.use("/api/auth", require("../routes/auth.js"));
app.use("/api/s3", require("../routes/AWSS3"));
app.use("/api/products", require("../routes/product.js"));
app.use("/api/messages", require("../routes/message"));
app.use("/api/transactions", require("../routes/transaction"));
app.use("/api/get", require("../routes/secondaryGets"));

app.get("/api/test", (req, res) => {
  res.send("Server is working");
});

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    error: "Something went wrong!",
  });
});

/*
|--------------------------------------------------------------------------
| Export for Vercel
|--------------------------------------------------------------------------
*/

module.exports = serverless(app);
