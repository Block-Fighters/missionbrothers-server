const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/auth");
const loginRouter = require("./user/login");
const registerRouter = require("./mission/register");

router.use("/user", loginRouter);
router.use("/mission", isLoggedIn, registerRouter);

module.exports = router;
