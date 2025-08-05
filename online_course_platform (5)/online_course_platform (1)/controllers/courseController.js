const Course = require("../model/courseModel");
const { catchAsync } = require("../utils/catchAsync");

exports.getAllCourses = catchAsync(async (req, res,next) => {
  const courses = await Course.find();
  res.status(200).json({ message: "success", data: courses });
});

exports.createCourse = catchAsync(async (req, res,next) => {
  const newCourse = await Course.create(req.body);
  res.status(201).json({ message: "created", data: newCourse });
});

exports.updateCourse = catchAsync(async (req, res,next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ message: "updated", data: course });
});

exports.deleteCourse = catchAsync(async (req, res,next) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(204).json({ message: "deleted" });
});
