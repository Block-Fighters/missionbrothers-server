const express = require("express");
const { Mission } = require("../../models");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mission
 *   description: mission management
 * paths:
 *  /mission/update:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [Mission]
 *     summary: 미션 컨트랙트 정보 업데이트
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              missionId:
 *                type: number
 *              contractAddress:
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
 *                  example: "미션 컨트랙트 주소를 등록했습니다."
 *       "500":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: "미션 컨트랙트 주소 등록을 실패했습니다."
 */

router.post("/", async (req, res) => {
  try {
    const { missionId, contractAddress } = req.body;

    await Mission.update(
      {
        contractAddress,
      },
      {
        where: { id: missionId },
      }
    );

    return res.status(200).json({
      message: "미션 컨트랙트 주소를 등록했습니다.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "미션 컨트랙트 주소 등록을 실패했습니다.",
    });
  }
});

module.exports = router;
