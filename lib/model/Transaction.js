const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  afterBalance: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["CREDIT", "DEBIT"],
  },

  createdAt: {
    type: Date,
  },

  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);