const user= require("../model/userModel");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const ApiFilters = require("../utils/apiFilter")
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await user.create(req.body);
  res.status(201).json({
    message: "User created successfully",
    data: newUser,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const filter= new ApiFilters(user.find(),req.query).fields().filter().pagination().sort()
  const userFilter= await filter.query;
 // const users = await user.find();
  res.status(200).json({
    message: "Users fetched successfully",
    length: userFilter.length,
    data: userFilter,
  });
});


exports.getUserById = catchAsync(async (req, res, next) => {

    const user = await user.findById(req.params.id);
    if (!user) {
       return next(new AppError("User not found", 404))
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });

})
exports.deleteUser = catchAsync(async (req, res, next) => {
  const userExists = await user.findById(req.params.id);
  if (!userExists) {
    return next(new AppError("User not found", 404));
  }
  await user.findByIdAndDelete(req.params.id);
  res.status(204).json();
})

exports.updateUser = catchAsync(async (req, res, next) => {
  const userExists = await user.findById(req.params.id);
  if (!userExists) {
    return next(new AppError("User not found", 404));
  }
  const updateUser = await user.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!updateUser) {
    return next(new AppError("User not found to update", 404));
  }
  res.status(200).json({
    message: "User updated successfully",
    data: updateUser,
  });
});



