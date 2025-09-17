const jwt = require("jsonwebtoken");
const Student = require("../models/student");
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
    console.log("Token found:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const student = await Student.findOne({ _id: decoded.student.Id });
    if (!student) {
      throw new Error();
    }

    req.token = token;
    req.user = student;
    req.body.userId = student._id;
    console.log("user = ", req.user.name);

    next();
  } catch (error) {
    res.status(401).json({ ErrorMsg: "Please authenticate.", error });
  }
};

module.exports = auth;
