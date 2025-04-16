const express = require("express");
const router = express.Router();
const Product = require("../models/product.js");
const auth = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

// Configure multer for product images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/product-images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create new product
router.post(
  "/addListings",
  auth,
  upload.single("images0"),
  async (req, res) => {
    try {
      const product = new Product({
        ...req.body,
        seller: req.user._id,
        // images: req.files.map((file) => file.path),
      });
      await product.save();
      console.log("product", product);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/getMyListing", auth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id }).populate(
      "seller",
      "name rating college"
    );
    if (!products) {
      return res.status(404).json({ error: "No products found" });
    }
    console.log("products", products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products with filters
router.get("/", async (req, res) => {
  try {
    const { search, category, priceRange, sortBy, user } = req.query;
    const query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (priceRange && priceRange !== "all") {
      const [min, max] = priceRange.split("-");
      query.price = { $gte: parseInt(min), $lte: parseInt(max) };
    }

    let sort = { createdAt: -1 };
    if (sortBy) {
      switch (sortBy) {
        case "price_low":
          sort = { price: 1 };
          break;
        case "price_high":
          sort = { price: -1 };
          break;
        case "rating":
          sort = { rating: -1 };
          break;
      }
    }

    const products = await Product.find(query)
      .sort(sort)
      .populate("seller", "name rating");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name rating college"
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Increment view count
    product.views += 1;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.patch("/:id", auth, upload.array("images", 5), async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "description",
    "price",
    "category",
    "condition",
    "location",
    "status",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  try {
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    updates.forEach((update) => (product[update] = req.body[update]));

    if (req.files && req.files.length > 0) {
      product.images = [
        ...product.images,
        ...req.files.map((file) => file.path),
      ];
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete product
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      seller: req.user._id,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Toggle favorite status
router.post("/:id/favorite", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const index = product.favorites.indexOf(req.user._id);
    if (index === -1) {
      product.favorites.push(req.user._id);
    } else {
      product.favorites.splice(index, 1);
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
