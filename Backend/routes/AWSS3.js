const multer = require("multer");
const router = require("express").Router();
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
router.post("/uploadImage", upload.single("image0"), (req, res) => {
  try {
    // console.log("req.body", req.body);
    // console.log("req.file", req.file);

    res.status(200).json({ image: req.body.images, url: "url" });
  } catch (err) {
    console.log("Error From AWS S3 opload Image API", err);
  }
});

router.delete("/deleteImage/:id", (req, res) => {
  res.status(200).send("Image is Deleted");
});

router.get("/getImage", (req, res) => {
  res.status(200).send("Imaeg is fetched");
});

module.exports = router;
