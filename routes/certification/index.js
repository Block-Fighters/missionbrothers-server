const express = require("express");
const router = express.Router();

const registerRouter = require("./register");
const listRouter = require("./list");
const reportRouter = require("./report");
const removeRouter = require("./removeReport");

router.use("/register", registerRouter);
router.use("/list", listRouter);
router.use("/report", reportRouter);
router.use("/remove", removeRouter);

module.exports = router;
