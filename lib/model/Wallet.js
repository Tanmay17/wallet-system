const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Number,
  },

  updatedAt: {
    type: Number,
  },
});

module.exports = mongoose.model("Wallet", WalletSchema);