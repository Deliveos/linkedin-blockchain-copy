const router = require('express').Router();

const db = require('../database.js');

/**
 *  @openapi
 *  /users:
 *    get:
 *      tags:
 *        - Users
 *      description: Use to request all users
 *      responses:
 *        '200':
 *          description: A successful response
 */
router.get('/', db.getUsers)
/**
 * @openapi
 * /users/{address}:
 *   get:
 *     tags:
 *        - Users
 *     parameters:
 *       - in: string
 *         name: address
 *         required: true
 *     description: Use to request user by address
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/:address', db.getUserById)
/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *        - Users
 *     description: Use to create a new user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             country:
 *               type: string
 *             city:
 *               type: string
 *             image:
 *               type: string
 *             latest_job_title:
 *               type: string
 *             latest_company:
 *               type: string
 *     responses:
 *       '201':
 *         description: A successful response
 */
router.post('/', db.createUser)
/**
 * @openapi
 * /users/{address}:
 *   put:
 *     tags:
 *       - Users
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
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             country:
 *               type: string
 *             city:
 *               type: string
 *             image:
 *               type: string
 *             latest_job_title:
 *               type: string
 *             latest_company:
 *               type: string
 *     description: Use to update user by address
*     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.put('/:address', db.updateUser)
/**
 * @openapi
 * /users/{address}:
 *   delete:
 *     tags:
 *        - Users
 *     parameters:
 *       - in: string
 *         name: address
 *         required: true
 *     description: Use to delete user by address
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.delete('/:address', db.deleteUser)

module.exports = router;