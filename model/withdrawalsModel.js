const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "pending",
  },
  transactionId: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  date: {
    type: String,
    default: "",
  },
  payment: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
  },
});

const Withdrawals = mongoose.model("Withdrawal", withdrawalSchema);

module.exports = Withdrawals;
