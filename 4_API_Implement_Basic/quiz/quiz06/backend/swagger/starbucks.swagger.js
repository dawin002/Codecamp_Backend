/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 회원 정보 조회
 *     tags: [Coffee]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: 아메리카노
 *                   kcal:
 *                     type: int
 *                     example: 10
 */
