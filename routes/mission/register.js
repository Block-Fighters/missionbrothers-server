const express = require("express");
const { Mission, User } = require("../../models");
const router = express.Router();

require("dotenv").config();

/**
 * @swagger
 * tags:
 *   name: Mission
 *   description: mission management
 * paths:
 *  /api/mission/register:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [Mission]
 *     summary: mission 등록
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
 *              recruitmentPeriod:
 *                type: string
 *              missionPeriod:
 *                type: string
 *              content:
 *                type: string
 *              category:
 *                type: string
 *              registrant:
 *                type: string
 *              img:
 *                type: string
 *              contractAddress:
 *                type: string
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad Request
 */

router.post("/register", async (req, res) => {
  try {
    const { metamask, missionTitle, rule, recruitmentPeriod, missionPeriod, content, category, registrant, img, contractAddress } = req.body;

    const UserInfo = await User.findOne({
      where: { metamask },
      attributes: {
        exclude: ["updatedAt", "deletedAt"],
      },
    });

    await Mission.create({
      missionTitle,
      rule,
      recruitmentPeriod,
      missionPeriod,
      content,
      category,
      registrant,
      img,
      contractAddress,
      UserId: UserInfo.id,
    });

    return res.status(200).json({
      message: "미션 등록 성공!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "미션 등록을 실패했습니다.",
    });
  }
});

module.exports = router;
