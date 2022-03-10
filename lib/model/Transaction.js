const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  wallet: {
    type: Schema.Types.ObjectId,
    ref: "Wallet",
    required: true,
  },

  amount: {
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
    type: Number,
  },

  updatedAt: {
    type: Number,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);