const express = require('express');

const {
  getAllQuizzes,
  createQuiz,
  updateQuiz,
  getQuizById,
  deleteQuiz,
  takeQuiz
} = require('../controllers/quizzesController');
const {
  addInstructorsToQuiz,
  removeInstructorsFromQuiz,
} = require('../controllers/instructorQuiz');
const { protect, restrictTo } = require('../controllers/authController');

const quizRouter = express.Router();
quizRouter.get('/', getAllQuizzes);
quizRouter.post('/createQuiz', protect, restrictTo('instructor'), createQuiz);
quizRouter.get("/:id", getQuizById);
quizRouter.patch("/:id", protect, restrictTo('instructor'), updateQuiz);
quizRouter.delete("/:id", deleteQuiz);
quizRouter.post('/addInstructors', protect, restrictTo('instructor'), addInstructorsToQuiz);
quizRouter.post('/removeInstructors', protect, restrictTo('instructor'), removeInstructorsFromQuiz);
quizRouter.get('/takeQuiz',takeQuiz)
module.exports = quizRouter;