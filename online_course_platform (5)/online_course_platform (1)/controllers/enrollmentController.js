const Enrollment= require("../model/enrollmentModel");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
exports.createEnrollment = catchAsync(async (req, res, next) => {
  const newEnrollment = await Enrollment.create(req.body);
  res.status(201).json({
    message: "Enrollment created successfully",
    data: newEnrollment,
  });
});

exports.getAllEnrollments = catchAsync(async (req, res, next) => {
  const enrollments = await Enrollment.find();
  res.status(200).json({
    message: "Enrollments fetched successfully",
    length: enrollments.length,
    data: enrollments,
  });
});


exports.getEnrollmentById = catchAsync(async (req, res, next) => {

    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
       return next(new AppError("Enrollment not found", 404))
    }

    res.status(200).json({
      message: "Enrollment fetched successfully",
      data: enrollment,
    });

})
exports.deleteEnrollment = catchAsync(async (req, res, next) => {
  const enrollmentExists = await Enrollment.findById(req.params.id);
  if (!enrollmentExists) {
    return next(new AppError("Enrollment not found", 404));
  }
  await Enrollment.findByIdAndDelete(req.params.id);
  res.status(204).json();
})

// relation(enroll) between user and enrollment
exports.enrollStudent = catchAsync(async (req, res, next) => {
  const enrollment = await Enrollment.create({
    ...req.body,
    studentId: req.params.studentId,
  });
  res.status(201).json({
    message: "Student enrolled successfully",
    data: enrollment,

  });

  
});
exports.updateEnrollment = catchAsync(async (req, res, next) => {
  const enrollmentExists = await Enrollment.findById(req.params.id);
  if (!enrollmentExists) {
    return next(new AppError("Enrollment not found", 404));
  }
  const updateEnrollment = await Enrollment.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!updateEnrollment) {
    return next(new AppError("Enrollment not found to update", 404));
  }
  res.status(200).json({
    message: "Enrollment updated successfully",
    data: updateEnrollment,
  });
});

