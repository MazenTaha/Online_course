const express = require('express');

const {
  getAllAssignments,
  createAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} = require('../controllers/assignmentController');
const {
  addInstructorsToAssignment,
  removeInstructorsFromAssignment,
} = require('../controllers/instructorAssignment');
const { protect, restrictTo } = require('../controllers/authController');

const assignmentRouter = express.Router();
assignmentRouter.get('/', getAllAssignments);
assignmentRouter.post('/createAssignment', protect, restrictTo('instructor'), createAssignment);
assignmentRouter.patch("/:id", updateAssignment);
assignmentRouter.get("/:id", getAssignmentById);
assignmentRouter.delete("/:id", deleteAssignment);
assignmentRouter.post('/addInstructors', protect, restrictTo('instructor'), addInstructorsToAssignment);
assignmentRouter.post('/removeInstructors', protect, restrictTo('instructor'), removeInstructorsFromAssignment);

module.exports = assignmentRouter;