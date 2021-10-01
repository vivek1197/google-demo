const express = require("express");
const router = express.Router();

const driveController = require("../controller/drive.controller");

router.post("/upload", driveController.createAndUploadFile);
//router.get("/list",);

module.exports = router;
