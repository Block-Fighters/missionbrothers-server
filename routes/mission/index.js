const express = require("express");
const router = express.Router();

const registerRouter = require("./register");
const listRouter = require("./list");
const updateRouter = require("./update");
const detailRouter = require("./detail");
const isLoggedIn = require("../../middleware/auth");

router.use("/register", isLoggedIn, registerRouter);
router.use("/update", isLoggedIn, updateRouter);
router.use("/list", listRouter);
router.use("/detail", detailRouter);

module.exports = router;
