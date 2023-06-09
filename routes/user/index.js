const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const modifyRouter = require("./modify");
const isLoggedIn = require("../../middleware/auth");

router.use("/login", loginRouter);
router.use("/modify", isLoggedIn, modifyRouter);

module.exports = router;
