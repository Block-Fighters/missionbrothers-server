const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Todo management
 * paths:
 *  /api/quest/register:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags: [Account]
 *     summary: account 조회
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad Request
 */
router.post("/register", async (req, res) => {
  console.log(req.headers);
  try {
    return res.status(200).json({
      message: "test 성공!",
      test: "test",
    });
  } catch (error) {
    return res.status(500).json({
      message: "실패!",
    });
  }
});

module.exports = router;
