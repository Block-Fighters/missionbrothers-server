const express = require("express");
const { Mission, User, Certification } = require("../../models");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mission
 *   description: mission management
 * paths:
 *  /mission/detail/{id}:
 *   get:
 *     security:
 *      - []
 *     tags: [Mission]
 *     summary: 미션 상세 조회
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: input mission post id
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
 *                  example: "미션 상세 정보를 조회했습니다."
 *                postData:
 *                  type: object
 *                  example: {
 *                                   "id": 1,
 *                                   "missionTitle": "string",
 *                                   "rule": "string",
 *                                   "recruitmentEnd": "string",
 *                                   "missionStart": "string",
 *                                   "missionEnd": "string",
 *                                   "content": "string",
 *                                   "category": "string",
 *                                   "registrant": "string",
 *                                   "img": "string",
 *                                   "contractAddress": "string",
 *                                   "User": {
 *                                     "id": 1,
 *                                     "metamask": "string",
 *                                     "nickname": "string"
 *                                   },
 *                              }
 *       "500":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: "미션 상세 조회에 실패했습니다."
 */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Mission.findOne({
      include: [
        {
          model: User,
          attribute: ["id", "nickname"],
          attributes: {
            exclude: ["updatedAt", "deletedAt", "createdAt"],
          },
        },
      ],
      where: { id: id },
      attributes: {
        exclude: ["updatedAt", "deletedAt", "createdAt", "UserId"],
      },
    });

    return res.status(200).json({
      message: "미션 상세 정보를 조회했습니다.",
      postData: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "미션 상세 조회에 실패했습니다.",
    });
  }
});

module.exports = router;
