const mongoose = require("mongoose");

const receiveSchema = new mongoose.Schema({
  received_at: {
    type: Date,
    default: Date.now,
  },

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },

  certificate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Certificate",
    required: true,
  }
});

module.exports = mongoose.model("Receive", receiveSchema);