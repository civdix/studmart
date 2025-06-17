const mongoose = require("mongoose");
//  Not using the transaction feature for now but schema and some routes are ready to use
const transactionSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled", "Refunded"],
    default: "Pending",
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Cash", "UPI", "Bank Transfer"],
  },
  meetingLocation: {
    type: String,
    required: true,
  },
  meetingTime: {
    type: Date,
    required: true,
  },
  buyerReview: {
    rating: Number,
    comment: String,
  },
  sellerReview: {
    rating: Number,
    comment: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for efficient querying
transactionSchema.index({ buyer: 1, createdAt: -1 });
transactionSchema.index({ seller: 1, createdAt: -1 });
transactionSchema.index({ product: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
