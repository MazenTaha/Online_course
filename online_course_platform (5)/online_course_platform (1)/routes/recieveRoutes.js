const express = require("express");
const router = express.Router();
const receiveController = require("../controllers/receiveController");

router.post("/receive", receiveController.receiveCertificate);

module.exports = router;