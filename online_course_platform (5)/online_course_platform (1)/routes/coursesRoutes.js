const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.use(protect);
router.use(restrictTo("admin"));

router.route("/")
  .get(getAllCourses)
  .post(createCourse);

router.route("/:id")
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
