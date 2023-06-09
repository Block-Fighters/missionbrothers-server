const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/auth");
const userRouter = require("./user");
const missionRouter = require("./mission");
const certificationRouter = require("./certification");

router.use("/user", userRouter);
router.use("/mission", isLoggedIn, missionRouter);
router.use("/certification", isLoggedIn, certificationRouter);

module.exports = router;
