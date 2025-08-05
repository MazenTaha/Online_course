const Receive = require("../model/receiveModel");
const Certificate = require("../model/certificateModel");
const User = require("../model/userModel");

exports.receiveCertificate = async (req, res) => {
  try {
    const { studentId, certificateId } = req.body;

    const receive = await Receive.create({
      student: studentId,
      certificate: certificateId,
    });

    res.status(201).json({
      status: "success",
      data: {
        receive,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};