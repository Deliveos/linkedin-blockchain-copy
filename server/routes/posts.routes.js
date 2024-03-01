const router = require('express').Router();
const db = require('../database.js');

/**
 * @openapi
 * /posts:
 *   post:
 *     tags:
 *        - Posts
 *     description: Use to create a new post
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userAddress:
 *               type: string
 *             title:
 *               type: string
 *             content:
 *               type: string
 *     responses:
 *       '201':
 *         description: A successful response
 */
router.post('/', db.createPost);
/**
 * @openapi
 * /posts:
 *   get:
 *     tags:
 *        - Posts
 *     description: Use to get all posts
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/', db.getPosts);
/**
 * @openapi
 * /posts/{id}:
 *   put:
 *     tags:
 *        - Posts
 *     description: Use to update post
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             content:
 *               type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.put('/:id', db.updatePost);
/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     tags:
 *        - Posts
 *     description: Use to delete post
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.delete('/:id', db.deletePost);
/**
 * @openapi
 * /posts/{id}/comments:
 *   post:
 *     tags:
 *        - Posts
 *     description: Use to add comment post
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userAddress:
 *               type: string
 *             content:
 *               type: string
 *     responses:
 *       '201':
 *         description: A successful response
 */
router.post('/:id/comments', db.addComment)
/**
 * @openapi
 * /posts/{id}/comments:
 *   get:
 *     tags:
 *        - Posts
 *     description: Use to get comments for the post
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/:id/comments', db.getComments);
/**
 * @openapi
 * /posts/comments/{id}:
 *   put:
 *     tags:
 *        - Posts
 *     description: Use to update the comment of the post
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.put('/comments/:id', db.updateComment);
/**
 * @openapi
 * /posts/comments/{id}:
 *   delete:
 *     tags:
 *        - Posts
 *     description: Use to update the comment of the post
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.delete('/comments/:id', db.deleteComment);
/**
 * @openapi
 * /posts/{id}/likes:
 *   post:
 *     tags:
 *        - Posts
 *     description: Use to add like
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userAddress:
 *               type: string
 *     responses:
 *       '201':
 *         description: A successful response
 */
router.post('/:id/likes', db.addLike)
/**
 * @openapi
 * /posts/{id}/likes:
 *   get:
 *     tags:
 *        - Posts
 *     description: Use to get likes for the post
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/:id/likes', db.getLikes);
/**
 * @openapi
 * /posts/{id}/likes:
 *   delete:
 *     tags:
 *        - Posts
 *     description: Use to add like
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userAddress:
 *               type: string
 *     responses:
 *       '201':
 *         description: A successful response
 */
router.delete('/:id/likes', db.deleteLike);
/**
 * @openapi
 * /posts/users/{address}:
 *   get:
 *     tags:
 *        - Posts
 *     description: Use to add like
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: ID of the post
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/users/:address', db.getPostsByAddress);

module.exports = router;