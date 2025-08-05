const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
    unique: true
  },
  course_title: {
    type: String,
    required: true
  },
  course_creationdate: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String
  }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
