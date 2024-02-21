const router = require('express').Router();

const db = require('../database.js');

/**
 * @swagger
 * /friends-requests/{address}:
 *   post:
 *     tags:
 *       - Friends Requests
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: Address of the request sender
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             receiver_id:
 *               type: string
 *     description: Use to create a new friend request
 *     responses:
 *       '201':
 *         description: A successful response
 */
router.post('/:address', db.createFriendsRequests)
/**
 * @openapi
 * /friends-requests/{address}:
 *   get:
 *     tags:
 *       - Friends Requests
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *     description: Use to request all friend requests by address
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/:address', db.getFriendsRequests)
/**
 * @openapi
 * /friends-requests/{address}:
 *   put:
 *     tags:
 *       - Friends Requests
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: Address of the request receiver
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             sender_id:
 *               type: string
 *             status:
 *               type: string
 *     description: Use to update friend request by address
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.put('/:address', db.updateFriendRequest)

module.exports = router;