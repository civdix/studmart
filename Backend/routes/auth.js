const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const jwt = require("jsonwebtoken");
const fetchStudentId = require("../middlewares/fetchStudentId");
require("dotenv").config();

router.post("/signup", (req, res) => {
  const { name, college, email, collegeEmail, rollNumber, password, phone } =
    req.body;
  Student.create({
    name,
    college,
    email,
    collegeEmail,
    rollNumber,
    password,
    phone,
  })
    .then((response) => {
      res.status(200).json({ success: true, StudentData: response });
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.status(404).json({ success: false, msg: err });
      } else {
        res.status(500).json({
          success: false,
          msg: err + "\n This Error was not due to duplicacy",
        });
      }
    });
});

router.post("/login", (req, res) => {
  console.log("Reached to the Login Route", req.headers);
  const { email, password } = req.headers;
  Student.findOne({ collegeEmail: email, password })
    .then((data) => {
      console.log("Student fetched from DB:", data);
      if (data == null) {
        return res.status(400).json({ success: false, msg: "No User Found" });
      }
      const payload = {
        student: {
          Id: data.id,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      console.log("user Found with id:", data.id + "\n token=", token);
      res.status(200).json({ success: true, StudentData: data, token });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
      console.log(err);
    });
});

module.exports = router;
