const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

const { User } = require("../../models");

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: metamask login
 * paths:
 *  /api/user/login/{userAddress}:
 *   post:
 *     tags: [Login]
 *     summary: login 조회
 *     parameters:
 *      - in: path
 *        name: userAddress
 *        schema:
 *          type: string
 *        required: true
 *        description: input user publickey
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad Request
 */
router.post("/login/:userAddress", async (req, res) => {
  console.log(req.params);
  const { userAddress } = req.params;

  try {
    const exUser = await User.findOne({
      where: {
        metamask: userAddress,
      },
    });

    if (!exUser) {
      await User.create({
        metamask: userAddress,
      });
    }

    const token = jwt.sign(
      {
        type: "JWT",
        metamask: userAddress,
      },
      process.env.SECRETKEY
    );

    return res.status(200).json({
      message: "토큰이 발급되었습니다.",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "로그인을 실패했습니다.",
    });
  }
});

module.exports = router;
