const Assignment = require('../model/assignmentModel');
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.getAllAssignments = catchAsync(async (req, res, next) => {
  const assignments = await Assignment.find().populate('instructorIds');
  res.status(200).json({
    message: 'success',
    length: assignments.length,
    data: assignments,
  });
});

exports.createAssignment = catchAsync(async (req, res, next) => {
  const { title, description, dueDate, attachments } = req.body;
  if (!title || !dueDate) {
    return next(new AppError("Missing required fields: title and dueDate", 400));
  }
  if (!req.user || req.user.role !== 'instructor') {
    return next(new AppError("Only instructors can create assignments", 403));
  }
  const newAssignment = await Assignment.create({
    title,
    description,
    dueDate,
    attachments,
  });
  res.status(201).json({
    message: "Assignment created successfully",
    data: await newAssignment.populate('instructorIds'),
  });
});

exports.getAssignmentById = catchAsync(async (req, res, next) => {
  const assignment = await Assignment.findOne({ _id: req.params.id }).populate('instructorIds');
  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }
  res.status(200).json({
    message: 'the assignment returned',
    data: assignment,
  });
});

exports.updateAssignment = catchAsync(async (req, res, next) => {
  const updateAssignment = await Assignment.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  ).populate('instructorIds');
  if (!updateAssignment) {
    return res.status(404).json({ message: "assignment not found to update" });
  }
  res.status(200).json({
    message: "assignment updated successfully",
    data: updateAssignment,
  });
});

exports.deleteAssignment = catchAsync(async (req, res, next) => {
  const assignmentExists = await Assignment.findById(req.params.id);
  if (!assignmentExists) {
    return next(new AppError('Assignment not found', 404));
  }
  await Assignment.findByIdAndDelete(req.params.id);
  res.status(204).json();
});