const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const missionRouter = require("./mission");
const certificationRouter = require("./certification");

router.use("/user", userRouter);
router.use("/mission", missionRouter);
router.use("/certification", certificationRouter);

module.exports = router;
