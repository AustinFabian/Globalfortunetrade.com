const mongoose = require("mongoose");

const roiSchema = new mongoose.Schema({
  planName: {
    type: String,
    unique: true
  },
  roi: {
    type: Number
  },
  duration: {
    type: Number
  },
  minAmount: {
    type: Number
  },
  maxAmount: {
    type: Number
  },
});

const roi = mongoose.model("roi", roiSchema);

module.exports = roi;
