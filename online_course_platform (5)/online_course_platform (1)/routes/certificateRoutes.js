const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  getAllCertificates,
  createCertificate,
  deleteCertificate,
} = require("../controllers/certificateController");

const router = express.Router();

router.use(protect);
router.use(restrictTo("admin"));

router.route("/")
  .get(getAllCertificates)
  .post(createCertificate);

router.route("/:id")
  .delete(deleteCertificate);

module.exports = router;
