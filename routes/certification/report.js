const express = require("express");
const { Certification, User } = require("../../models");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Certification
 *   description: certification management
 * paths:
 *  /certification/report:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [Certification]
 *     summary: 인증 신고
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              metamask:
 *                type: string
 *              postId:
 *                type: number
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
 *                  example: "해당 글을 신고했습니다."
 *       "500":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: "신고를 실패했습니다."
 */

router.post("/", async (req, res) => {
  try {
    const { metamask, postId } = req.body;

    const UserInfo = await User.findOne({
      where: { metamask },
      attributes: {
        exclude: ["updatedAt", "deletedAt"],
      },
    });

    const post = await Certification.findOne({ where: { id: postId } });
    await post.addReporter(UserInfo.id);

    return res.status(200).json({
      message: "해당 글을 신고했습니다.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "신고를 실패했습니다.",
    });
  }
});

module.exports = router;
