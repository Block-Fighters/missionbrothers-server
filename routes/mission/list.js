const express = require("express");
const { Mission } = require("../../models");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mission
 *   description: mission management
 * paths:
 *  /mission/list:
 *   post:
 *     security:
 *      - []
 *     tags: [Mission]
 *     summary: 미션 조회
 *     requestBody:
 *       description:
 *         start (시작 게시글 index), limit (보여질 게시글 갯수)
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
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
 *                  example: "미션 목록을 조회했습니다."
 *                postData:
 *                  type: object
 *                  example: [
 *                              {
 *                                 "id": 1,
 *                                 "missionTitle": "string",
 *                                 "recruitmentEnd": "string",
 *                                 "missionStart": "string",
 *                                 "missionEnd": "string",
 *                                 "category": "string",
 *                                 "img": "string"
 *                              }
 *                           ]
 *       "500":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: "미션 목록 조회에 실패했습니다."
 */

router.post("/", async (req, res) => {
  try {
    const { start, limit } = req.body;

    const posts = await Mission.findAll({
      order: [["id", "DESC"]],
      limit: limit, // 페이지에 표시될 게시물 수
      offset: start, // 시작 지점
      attributes: {
        exclude: [
          "updatedAt",
          "deletedAt",
          "createdAt",
          "contractAddress",
          "UserId",
          "content",
          "registrant",
          "rule",
        ],
      },
    });

    return res.status(200).json({
      message: "미션 목록을 조회했습니다.",
      postData: posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "미션 목록 조회에 실패했습니다.",
    });
  }
});

module.exports = router;
