const express = require("express");
const { Mission, User } = require("../../models");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mission
 *   description: mission management
 * paths:
 *  /mission/register:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [Mission]
 *     summary: 미션 등록
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              metamask:
 *                type: string
 *              missionTitle:
 *                type: string
 *              rule:
 *                type: string
 *              recruitmentEnd:
 *                type: string
 *              missionStart:
 *                type: string
 *              missionEnd:
 *                type: string
 *              content:
 *                type: string
 *              category:
 *                type: string
 *              registrant:
 *                type: string
 *              img:
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
 *                  example: "미션을 등록했습니다."
 *                post:
 *                  type: object
 *                  example: 1
 *       "500":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: "미션 등록을 실패했습니다."
 */
router.post("/", async (req, res) => {
  try {
    const {
      metamask,
      missionTitle,
      rule,
      recruitmentEnd,
      missionStart,
      missionEnd,
      content,
      category,
      registrant,
      img,
    } = req.body;

    const UserInfo = await User.findOne({
      where: { metamask },
      attributes: {
        exclude: ["updatedAt", "deletedAt"],
      },
    });

    const MissionInfo = await Mission.create({
      missionTitle,
      rule,
      recruitmentEnd,
      missionStart,
      missionEnd,
      content,
      category,
      registrant,
      img,
      UserId: UserInfo.id,
    });

    return res.status(200).json({
      message: "미션을 등록했습니다.",
      post: MissionInfo.id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "미션 등록을 실패했습니다.",
    });
  }
});

module.exports = router;
