const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("bufferCommands", false);

const mongoURI = process.env.MONGODB_URI;

const connectToMongo = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB Already Connected");
      return;
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      dbName: "studmart",
    });

    console.log("====================================");
    console.log("Database Connected Successfully");
    console.log("====================================");
  } catch (e) {
    console.log("====================================");
    console.log("MongoDB Connection Failed");
    console.log(e);
    console.log("====================================");

    throw e;
  }
};

const disconnectToMongo = async () => {
  try {
    await mongoose.disconnect();

    console.log("====================================");
    console.log("Database Disconnected Successfully");
    console.log("====================================");
  } catch (e) {
    console.log("====================================");
    console.log("Database Disconnection Failed");
    console.log(e);
    console.log("====================================");
  }
};

module.exports = { connectToMongo, disconnectToMongo };
