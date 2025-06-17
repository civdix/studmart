const multer = require("multer");
const router = require("express").Router();
const storage = multer.memoryStorage();
const crypto = require("crypto");
const sharp = require("sharp");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
require("dotenv").config();
const upload = multer({ storage: storage });
const bucketName = process.env.S3_BUCKET;
const bucketRegion = process.env.S3_BUCKET_REGION;
const bucketAccessKey = process.env.S3_ACCESS_KEY;
const bucketSecretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const Product = require("../models/product.js");
const User = require("../models/User.js");
const s3 = new S3Client({
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey,
  },
  region: bucketRegion,
});
const { getSignedImages, setSignedImages } = require("../middlewares/redis.js");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const randomBytes = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

router.post(
  "/uploadImage",
  upload.single("image0") || upload.single("profilePicture"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No image file uploaded" });
      }

      // console.log("File received:", req.file.buffer);
      console.log("File received:", req.body);
      const buffer = await sharp(req.file.buffer)
        .resize({
          width: 1920,
          height: 1080,
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .jpeg({ quality: 60 })
        .toBuffer();

      console.log("File after Resizing:", buffer);
      const imageName = randomBytes(16) + "_" + req.file.originalname;
      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);

      await s3.send(command, (err, data) => {
        if (err) {
          console.log("Error uploading data: ", err);
          return res.status(500).send("Error uploading data: ", err);
        } else {
          console.log("Successfully uploaded data to S3");
        }
      });
      console.log("File uploaded successfully", req.file);

      res.status(200).json({ url: "url", AWSName: imageName });
    } catch (err) {
      console.log("Error From AWS S3 opload Image API", err);
    }
  }
);

router.delete("/deleteImage/:id", async (req, res) => {
  // router.delete("/deleteImage/:imageName", (req, res) => { // we can not use this imageName as if anyone hit with random request this api it might create disaster

  const post = await Product.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  console.log("Post", post);
  const imageName = post.images[0];
  if (!imageName) {
    return res.status(404).json({ message: "Image not found" });
  }
  console.log("Image Name", imageName);
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };
  const command = new DeleteObjectCommand(params);
  await s3.send(command, (err, data) => {
    if (err) {
      console.log("Error deleting data: ", err);
      return res.status(500).send("Error deleting data: ", err);
    } else {
      console.log("Successfully deleted data from S3");
    }
  });
  console.log("File deleted successfully", req.params.id);
  res
    .status(200)
    .json({ success: true, imageUrl: imageName, message: "Image is Deleted" });
});

router.post("/getImage", getSignedImages, async (req, res) => {
  try {
    if (req.imageUrlFromRedisMiddleware) {
      return res
        .status(200)
        .json({ imageUrl: req.imageUrlFromRedisMiddleware, success: true });
    }
    // if it is in redis then return the imageUrl as the response of redis
    if (!(req.body.imageUrls[0] || req.body.imageUrl)) {
      return res.status(400).json({
        success: false,
        message: "No image URL provided in the request",
      });
    }
    const getObjectParams = {
      Bucket: bucketName,
      Key: req.body.imageUrls[0] || req.body.imageUrl,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    // console.log("URL", url);
    const istTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    // console.log("System Time (UTC):", istTime);
    setSignedImages(req.body.productId, url, 3600); // Store the signed URL in Redis with a 1-hour expiry
    res.status(200).json({ imageUrl: url, success: true });
  } catch (error) {
    console.error("Error in getImage:", error);
    res.status(500).json({ success: false, message: "Error fetching image" });
  }
});

module.exports = router;
