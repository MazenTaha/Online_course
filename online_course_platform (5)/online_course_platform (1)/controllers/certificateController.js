const Certificate = require("../model/certificateModel");
const { catchAsync } = require("../utils/catchAsync");
exports.getAllCertificates = catchAsync(async (req, res,next) => {
  const certs = await Certificate.find();
  res.status(200).json({ message: "success", data: certs });
});

exports.createCertificate = catchAsync(async (req, res,next) => {
  const newCert = await Certificate.create(req.body);
  res.status(201).json({ message: "created", data: newCert });
});

exports.deleteCertificate = catchAsync(async (req, res,next) => {
  await Certificate.findByIdAndDelete(req.params.id);
  res.status(204).json({ message: "deleted" });
});
