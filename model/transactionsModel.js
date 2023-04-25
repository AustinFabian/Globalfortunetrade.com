const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  plan: {
    type: String,
  },
  userId: {
    type: String,
  },
  userEmail:{
    type: String,
  },
  address: {
    type: String,
    default: ""
  },
  crypto:{
    type: String,
    default: ""
  },
  amount: {
    type: Number,
  },
  time: {
    type: String,
  },
  ROI: {
    type: Number,
  },
  duration: {
    type: String,
  },
  status:{
    type: String,
    default: "pending"
  },
  transId:{
    type: String,
    default: ""
  }
});

const Transactions = mongoose.model("Transaction", transactionSchema);

module.exports = Transactions;
