const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const auth = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.header("studenttoken") ||
      "No token Found";

    // if (!token) {
    //   throw new Error();
    // }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decoded.user.id });
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    console.log("req.body", req.user);

    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate.", error });
  }
};

module.exports = auth;
