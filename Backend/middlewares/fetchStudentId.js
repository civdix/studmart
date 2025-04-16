const jwt = require("jsonwebtoken");
require("dotenv").config();

const fetchStudentId = (req, res, next) => {
  try {
    const token = req.headers.studenttoken; // Case-insensitive keys recommended

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access Denied. No token provided." });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Extract studentId from the decoded token
    req.studentId = decoded.user.id;
    next(); // Continue to the next middleware/route
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = fetchStudentId;
