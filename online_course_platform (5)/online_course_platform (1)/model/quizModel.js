const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
//de relation between user and quiz
    studentId:{
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,

    },

    instructorId: {
      type: mongoose.Schema.ObjectId,
      ref: "instructorId",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
      },
    ],
    timeLimit: {
      type: Number, 
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

quizSchema.virtual("student", {
  ref: "User",
  foreignField: "_id",
  localField: "studentId",
});


const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;