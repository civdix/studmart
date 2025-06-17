const { Redis } = require("ioredis");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log(process.env.REDIS_PASSWORD);
const redis = new Redis({
  password: "mypassword",
  //   host: process.env.REDIS_HOST,
  //   port: process.env.REDIS_PORT,
  //   password: process.env.REDIS_PASSWORD,
});

async function getSignedImages(req, res, next) {
  try {
    const id = req.body.userId || req.body.productId;
    if (!id) {
      return res.status(400).json({
        error: "Bad Request: userId or productId is required",
      });
    }
    const result = await redis.get("productImage:" + id);
    if (result) {
      req.imageUrlFromRedisMiddleware = result; // Store the image URL in the request object for further use
      console.log("Cache hit for Product/User", id);
    } else {
      console.log("Cache miss for product images, fetching from  s3");
    }
    next();
  } catch (error) {
    console.error("Error fetching signed images:", error);
    return res.status(500).json({
      error: "Internal Server Error error fetching signed image in redis get",
    });
  }
}

async function setSignedImages(id, signedUrl, expiry = 3600) {
  try {
    if (!id) {
      console.log({
        error: "Bad Request: userId or productId is required",
      });
      return;
    }
    await redis.set("productImage:" + id, signedUrl, "EX", expiry);
    console.log("Cache set for productId:", id);
  } catch (error) {
    console.error("Error setting signed images in Redis:", error);
    throw new Error(
      "Internal Server Error error setting signed image in redis set"
    );
  }
}

module.exports = {
  getSignedImages,
  setSignedImages,
};
