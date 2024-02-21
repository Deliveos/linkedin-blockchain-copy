const router = require('express').Router();

const db = require('../database.js');

/**
 * @openapi
 * /friends/{address}:
 *   get:
 *     tags:
 *       - Friends
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *     description: Use to request all friends by address
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/:address', db.getFriends)
/**
 * @openapi
 * /friends/{address}:
 *   delete:
 *     tags:
 *       - Friends
 *     description: Use to delete friend by address
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             friend_id:
 *               type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.delete('/:address', db.deleteFriend)

module.exports = router;