const express = require("express");
const { User } = require("../../models");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * paths:
 *  /user/modify/{userAddress}:
 *   post:
 *     tags: [User]
 *     summary: 사용자 정보 수정
 *     parameters:
 *      - in: path
 *        name: userAddress
 *        schema:
 *          type: string
 *        required: true
 *        description: input user publickey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nickname:
 *                type: string
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
 *                  example: "회원 정보가 수정되었습니다."
 *       "500":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: "회원 정보 수정을 실패했습니다."
 */

router.post("/:userAddress", async (req, res) => {
  const { userAddress } = req.params;
  const { nickname } = req.body;

  try {
    await User.update(
      {
        nickname,
      },
      {
        where: { metamask: userAddress },
      }
    );

    return res.status(200).json({
      message: "회원 정보가 수정되었습니다.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "회원 정보 수정을 실패했습니다.",
    });
  }
});

module.exports = router;
