const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { getSignedImages, setSignedImages } = require("../middlewares/redis.js");
require("dotenv").config();
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile-pictures");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const generateAuthToken = (id) => {
  const data = {
    user: {
      id,
    },
  };
  return jwt.sign(data, process.env.JWT_SECRET_KEY);
};

// Register new user
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await generateAuthToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    console.log("Reached to the Login Route");
    const user = await User.findOne({
      email: req.headers.email,
    });
    if (!user.comparePassword(req.headers.password)) {
      res.status(400).json({
        success: false,
        error: "Pass do not match: Invalid credentials",
      });
    }
    const token = await generateAuthToken(user._id);
    console.log({ success: true, user, token });
    res.status(201).json({ success: true, user, token });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, error: "Invalid login credentials" });
  }
});

// Logout user
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile or Data
router.get("/profile/me", auth, getSignedImages, async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  // Recieving right Object Id
  if (!req.imageUrlFromRedisMiddleware) {
    const response = await fetch("http://localhost:5000/api/s3/getImage", {
      method: "POST", // changed to POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrls: [user.profilePicture],
        userId: user._id || null, // Ensure productId is passed if available
      }),
    });
    const { success, imageUrl } = await response.json();
    if (!success) {
      return res.status(500).json({
        success: false,
        error: "Failed to fetch profile picture",
      });
    }
    setSignedImages(user._id, imageUrl, 5000); // Store the signed URL in Redis with a 1-hour expiry
    user.profilePicture = imageUrl;
    res.status(201).json({ success: true, user });
  } else {
    user.profilePicture = req.imageUrlFromRedisMiddleware;
    res.status(201).json({ success: true, user });
  }
});

// Update user profile
//  have to make cache the image if changes the profile photot as the
//  reddis will point to old image still
//  on changing, i should delete old image
router.patch(
  "/profile",
  auth,
  upload.single("profilePicture"),
  async (req, res) => {
    const updates = Object.keys(req.body);

    const allowedUpdates = [
      "name",
      "email",
      "password",
      "college",
      "phone",
      "profilePicture",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates!" });
    }

    try {
      updates.forEach((update) => (req.user[update] = req.body[update]));
      if (req.file) {
        req.user.profilePicture = req.file.path;
      }
      await req.user.save();
      res.json(req.user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get user's listings
router.get("/listings", auth, async (req, res) => {
  try {
    const listings = await Product.find({ seller: req.user._id });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's transactions
router.get("/transactions", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ buyer: req.user._id }, { seller: req.user._id }],
    }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
