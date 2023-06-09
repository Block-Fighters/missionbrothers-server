const jwt = require("jsonwebtoken");
require("dotenv").config();

const isLoggedIn = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split("Bearer ");
    const token = bearer[1];

    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "인증 실패",
        });
      }

      req.userId = decoded.userId;
      next();
    });
  } else {
    return res.status(400).json({
      message: "token이 존재하지 않습니다.",
    });
  }
};

module.exports = isLoggedIn;
