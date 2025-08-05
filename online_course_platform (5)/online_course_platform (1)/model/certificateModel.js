const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  cer_id: {
    type: String,
    required: true,
    unique: true
  },
  cer_issuedate: {
    type: Date,
    default: Date.now
  },
  issued_by: {
    type: String,
    required: true
  }
});

const Certificate = mongoose.model("Certificate", certificateSchema);
module.exports = Certificate;
