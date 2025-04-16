const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = "mongodb://localhost:27017/StudMart";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("====================================");
    console.log("DataBase Connected Successfully");
    console.log("====================================");
  } catch (e) {
    console.log("Connection Failed in Connect to mongo ()");
  }
};

const disconnectToMongo = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected Succesfully");
  } catch (e) {
    console.log(e, "Connection Not Disconnected");
  }
};

module.exports = { connectToMongo, disconnectToMongo };
