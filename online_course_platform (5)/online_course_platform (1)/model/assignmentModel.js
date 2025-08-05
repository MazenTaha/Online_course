const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    instructorIds: [{
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    }],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    attachments: [{
      type: String,
    }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;