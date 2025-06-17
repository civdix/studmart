const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const jwt = require("jsonwebtoken");
const fetchStudentId = require("../middlewares/fetchStudentId");
require("dotenv").config();

router.post("/signup", (req, res) => {
  const { name, college, email, collegeEmail, rollNumber, password } = req.body;
  Student.create({ name, college, email, collegeEmail, rollNumber, password })
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

router.get("/login", (req, res) => {
  const { email, password } = req.headers;
  Student.findOne({ email, password })
    .then((data) => {
      const payload = {
        student: {
          Id: data.id,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      // console.log("user Found with id:", data.id + "\n");
      res.status(200).json({ success: true, StudentData: data, token });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
      console.log(err);
    });
});

module.exports = router;
