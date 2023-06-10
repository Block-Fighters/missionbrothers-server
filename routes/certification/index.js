const express = require("express");
const router = express.Router();

const registerRouter = require("./register");
const listRouter = require("./list");
const reportRouter = require("./report");
const removeRouter = require("./removeReport");
const isLoggedIn = require("../../middleware/auth");

router.use("/register", isLoggedIn, registerRouter);
router.use("/list", listRouter);
router.use("/report", isLoggedIn, reportRouter);
router.use("/remove", isLoggedIn, removeRouter);

module.exports = router;
