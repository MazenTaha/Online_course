const Quiz = require('../model/quizModel');
const User = require('../model/userModel');
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.addInstructorsToQuiz = catchAsync(async (req, res, next) => {
  const { quizId, instructorIds } = req.body;
  if (!quizId || !instructorIds || !Array.isArray(instructorIds)) {
    return next(new AppError("Missing required fields: quizId and instructorIds array", 400));
  }
  if (!req.user || req.user.role !== 'instructor') {
    return next(new AppError("Only instructors can modify quiz instructors", 403));
  }
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return next(new AppError("Quiz not found", 404));
  }
  const instructors = await User.find({ _id: { $in: instructorIds }, role: 'instructor' });
  if (instructors.length !== instructorIds.length) {
    return next(new AppError("All instructorIds must belong to instructors", 400));
  }
  quiz.instructorIds = [...new Set([...quiz.instructorIds, ...instructorIds])]; // Avoid duplicates
  const updatedQuiz = await quiz.save();
  res.status(200).json({
    message: "Instructors added to quiz successfully",
    data: await updatedQuiz.populate('instructorIds'),
  });
});

exports.removeInstructorsFromQuiz = catchAsync(async (req, res, next) => {
  const { quizId, instructorIds } = req.body;
  if (!quizId || !instructorIds || !Array.isArray(instructorIds)) {
    return next(new AppError("Missing required fields: quizId and instructorIds array", 400));
  }
  if (!req.user || req.user.role !== 'instructor') {
    return next(new AppError("Only instructors can modify quiz instructors", 403));
  }
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return next(new AppError("Quiz not found", 404));
  }
  quiz.instructorIds = quiz.instructorIds.filter(id => !instructorIds.includes(id.toString()));
  const updatedQuiz = await quiz.save();
  res.status(200).json({
    message: "Instructors removed from quiz successfully",
    data: await updatedQuiz.populate('instructorIds'),
  });
});