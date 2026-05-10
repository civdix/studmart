const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectToMongo } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    await connectToMongo();

    console.log("MongoDB Connected");

    // Routes AFTER DB connection
    app.use("/api/users", require("./routes/user"));
    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/s3", require("./routes/AWSS3"));
    app.use("/api/products", require("./routes/product"));
    app.use("/api/messages", require("./routes/message"));
    app.use("/api/transactions", require("./routes/transaction"));
    app.use("/api/get", require("./routes/secondaryGets"));

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: "Something went wrong!" });
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.log("Startup Error:", err);
  }
}

startServer();
