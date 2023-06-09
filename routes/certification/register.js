const express = require("express");
const { Certification, User, Mission } = require("../../models");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Certification
 *   description: certification management
 * paths:
 *  /certification/register:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [Certification]
 *     summary: 인증 등록
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              missionId:
 *                type: number
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
 *                  example: "인증했습니다."
 *       "500":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   example: "인증에 실패했습니다."
 */

router.post("/", async (req, res) => {
  try {
    const { missionId, img } = req.body;

    await Certification.create({
      img,
      MissionId: missionId,
    });

    return res.status(200).json({
      message: "인증했습니다.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "인증에 실패했습니다.",
    });
  }
});

module.exports = router;
