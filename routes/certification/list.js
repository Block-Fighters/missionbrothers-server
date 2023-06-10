const express = require("express");
const { Certification, User } = require("../../models");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Certification
 *   description: certification management
 * paths:
 *  /certification/list:
 *   post:
 *     security:
 *      - []
 *     tags: [Certification]
 *     summary: 인증 조회
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              metamask:
 *                type: string
 *              missionId:
 *                type: number
 *              start:
 *                type: number
 *              limit:
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
 *                  example: "인증 목록을 조회 했습니다."
 *                postData:
 *                  type: object
 *                  example: [
 *                              {
 *                                   "id": 1,
 *                                   "img": "string",
 *                                   "reporters": 0
 *                              }
 *                            ]
 *                hasReported:
 *                  type: boolean
 *                  example: true
 *       "500":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: "인증 목록 조회에 실패했습니다."
 */

router.post("/", async (req, res) => {
  try {
    const { metamask, missionId, start, limit } = req.body;

    const posts = await Certification.findAll({
      order: [["id", "DESC"]],
      limit: limit, // 페이지에 표시될 게시물 수
      offset: start, // 시작 지점
      attributes: {
        exclude: ["updatedAt", "deletedAt", "createdAt", "MissionId"],
      },
      include: {
        model: User,
        as: "reporters",
        attributes: {
          exclude: ["updatedAt", "deletedAt", "createdAt", "id"],
        },
      },
      where: { MissionId: missionId },
    });

    // 해당 글을 신고했는지 여부
    const hasMetamask = posts.some((post) =>
      post.reporters.some((reporter) => reporter.metamask === metamask)
    );

    // "reporters" 배열의 길이로 변환
    const postData = posts.map((post) => ({
      ...post.toJSON(),
      reporters: post.reporters.length,
    }));

    return res.status(200).json({
      message: "인증 목록을 조회 했습니다.",
      postData: postData,
      hasReported: hasMetamask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "인증 목록 조회에 실패했습니다.",
    });
  }
});

module.exports = router;
