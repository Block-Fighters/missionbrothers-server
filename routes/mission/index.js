const express = require("express");
const router = express.Router();

const registerRouter = require("./register");
const listRouter = require("./list");
const updateRouter = require("./update");
const detailRouter = require("./detail");

router.use("/register", registerRouter);
router.use("/list", listRouter);
router.use("/update", updateRouter);
router.use("/detail", detailRouter);

module.exports = router;
