const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const auth = require("../middlewares/auth");
const getImage = async (thing) => {
  const response = await fetch("http://localhost:5000/api/s3/getImage/", {
    method: "POST", // changed to POST
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageUrls: [thing.profilePicture] || [thing.images],
      userId: thing.id,
    }),
  });

  const { success, imageUrl } = await response.json();
  if (success) {
    thing.images = [imageUrl];
  } else {
    thing.images = [
      "https://i.pinimg.com/736x/5d/02/f7/5d02f7a385be2e52c836bd25192029dd.jpg",
    ];
  }
  return thing;
};
// Get messages between users for a specific product
router.get("/:recipientId/:productId", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        {
          sender: req.user._id,
          recipient: req.params.recipientId,
          product: req.params.productId,
        },
        {
          sender: req.params.recipientId,
          recipient: req.user._id,
          product: req.params.productId,
        },
      ],
    }).sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      { recipient: req.user._id, sender: req.params.recipientId, read: false },
      { read: true }
    );

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send a new message
router.post("/", auth, async (req, res) => {
  try {
    const message = new Message({
      sender: req.user._id,
      recipient: req.body.recipientId,
      product: req.body.productId,
      content: req.body.content,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get unread message count
router.get("/unread/count", auth, async (req, res) => {
  try {
    const count = await Message.countDocuments({
      recipient: req.user._id,
      read: false,
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all conversations
router.get("/conversations", auth, async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: req.user._id }, { recipient: req.user._id }],
        },
      },
      {
        $group: {
          _id: {
            product: "$product",
            otherUser: {
              $cond: {
                if: { $eq: ["$sender", req.user._id] },
                then: "$recipient",
                else: "$sender",
              },
            },
          },
          lastMessage: { $last: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.otherUser",
          foreignField: "_id",
          as: "otherUser",
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "_id.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $sort: { "lastMessage.createdAt": -1 },
      },
    ]);

    Promise.all(
      conversations.map((conv) => {
        return getImage({
          profilePicture: conv.otherUser[0].profilePicture,
          id: conv.otherUser[0]._id,
        })
          .then((result) => {
            conv.otherUser[0].profilePicture =
              result.images[0] ||
              "https://i.pinimg.com/736x/5d/02/f7/5d02f7a385be2e52c836bd25192029dd.jpg";
            return conv;
          })
          .catch((err) => {
            console.error("Error fetching image:", err);
            conv.otherUser[0].profilePicture =
              "https://i.pinimg.com/736x/5d/02/f7/5d02f7a385be2e52c836bd25192029dd.jpg";
            return conv;
          });
      })
    )
      .then((updatedConversations) => {
        res.json(updatedConversations); // ✅ respond to frontend here
      })
      .catch((err) => {
        console.error("Error in Promise.all:", err);
        res.status(500).json({ error: "Internal server error" });
      });
    // res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete all messages for a Product means all conversation will be deleted
// We will not use this API as it harms the legal evidence as if any one make delete the data
router.delete("delete/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedMessages = await Message.deleteMany({ product: productId });
    if (deletedMessages.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No messages found for this product." });
    }
  } catch (error) {
    console.error("Error deleting messages:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
  res.status(200).json({ message: "Messages Deleted" });
});

module.exports = router;
