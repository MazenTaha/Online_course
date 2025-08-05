const Assignment = require('../model/assignmentModel');
const User = require('../model/userModel');
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.addInstructorsToAssignment = catchAsync(async (req, res, next) => {
  const { assignmentId, instructorIds } = req.body;
  if (!assignmentId || !instructorIds || !Array.isArray(instructorIds)) {
    return next(new AppError("Missing required fields: assignmentId and instructorIds array", 400));
  }
  if (!req.user || req.user.role !== 'instructor') {
    return next(new AppError("Only instructors can modify assignment instructors", 403));
  }
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
    return next(new AppError("Assignment not found", 404));
  }
  const instructors = await User.find({ _id: { $in: instructorIds }, role: 'instructor' });
  if (instructors.length !== instructorIds.length) {
    return next(new AppError("All instructorIds must belong to instructors", 400));
  }
  assignment.instructorIds = [...new Set([...assignment.instructorIds, ...instructorIds])]; // Avoid duplicates
  const updatedAssignment = await assignment.save();
  res.status(200).json({
    message: "Instructors added to assignment successfully",
    data: await updatedAssignment.populate('instructorIds'),
  });
});

exports.removeInstructorsFromAssignment = catchAsync(async (req, res, next) => {
  const { assignmentId, instructorIds } = req.body;
  if (!assignmentId || !instructorIds || !Array.isArray(instructorIds)) {
    return next(new AppError("Missing required fields: assignmentId and instructorIds array", 400));
  }
  if (!req.user || req.user.role !== 'instructor') {
    return next(new AppError("Only instructors can modify assignment instructors", 403));
  }
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
    return next(new AppError("Assignment not found", 404));
  }
  assignment.instructorIds = assignment.instructorIds.filter(id => !instructorIds.includes(id.toString()));
  const updatedAssignment = await assignment.save();
  res.status(200).json({
    message: "Instructors removed from assignment successfully",
    data: await updatedAssignment.populate('instructorIds'),
  });
});