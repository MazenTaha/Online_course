const express = require("express");
const {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  enrollStudent,
} = require("../controllers/enrollmentController");

const enrollmentRouter = express.Router();
enrollmentRouter.get("/", getAllEnrollments);
enrollmentRouter.get("/:id", getEnrollmentById);
enrollmentRouter.post("/", createEnrollment);
enrollmentRouter.post('/enroll',enrollStudent)
module.exports = enrollmentRouter;
