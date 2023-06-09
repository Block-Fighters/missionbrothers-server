const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const router = express.Router();

require("dotenv").config();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * paths:
 *  /user/login/{userAddress}:
 *   get:
 *     security:
 *      - []
 *     tags: [User]
 *     summary: 로그인 및 토큰 발행
 *     parameters:
 *      - in: path
 *        name: userAddress
 *        schema:
 *          type: string
 *        required: true
 *        description: input user publickey
 *     responses:
 *       "200":
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: object
 *                  example: "토큰이 발급되었습니다."
 *                token:
 *                  type: object
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwibWV0YW1hc2siOiIweDUwMDQ4OUEzY0MxMjRDZTNGMjExOTdiMkUxODU5RGJENTg0RDhGQTUiLCJpYXQiOjE2ODYzMzg3MzB9.OaNF38Hkd3_UEQay8uQZbA3NLyfy9BRSelvg0zNQda4"
 *       "500":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: "로그인을 실패했습니다."
 */

router.get("/:userAddress", async (req, res) => {
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
