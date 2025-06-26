const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser , postUserWithTasks, getUsers} = require('../controllers/userController');

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Amman
 *               email:
 *                 type: string
 *                 example: amman@example.com
 *               password:
 *                 type: string
 *                 example: "123ERDG"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request. Name and email required.
 */
router.post('/', createUser);

/**
 * @swagger
 * /api/users/createUserAndTask:
 *   post:
 *     summary: Create a new user with associated tasks
 *     description: Creates a user (with unique email) and optionally assigns multiple tasks (with unique names per user)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Amman Sajjad"
 *                 description: "Full name of the user"
 *               email:
 *                 type: string
 *                 example: "amman@example.com"
 *                 description: "Unique email address for the user"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *               tasks:
 *                 type: array
 *                 description: "Optional list of tasks to assign to this user"
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - description
 *                     - status
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Complete React integration"
 *                       description: "Unique task name for this user"
 *                     description:
 *                       type: string
 *                       example: "Build and integrate frontend components"
 *                     status:
 *                       type: string
 *                       example: "pending"
 *     responses:
 *       200:
 *         description: User and tasks created successfully
 *       400:
 *         description: Bad request. Missing required fields or invalid data.
 *       500:
 *         description: Internal server error
 */

router.post('/createUserAndTask', postUserWithTasks);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user by ID
 *     description: Updates the details of a user using their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Amman Sajjad"
 *               email:
 *                 type: string
 *                 example: "updated.email@example.com"
 *               password:
 *                 type: string
 *                 example: "newsecurepassword"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes an existing user using their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID (optionally embed related data)
 *     description: Retrieves a user by their unique ID. Optionally embed related resources (like tasks) using the `_embed` query parameter.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: integer
 *       - in: query
 *         name: _embed
 *         required: false
 *         description: Name of the related model scope to embed (e.g. 'withTasks')
 *         schema:
 *           type: string
 *           example: withTasks
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Amman Sajjad"
 *                 email:
 *                   type: string
 *                   example: "amman@example.com"
 *                 tasks:
 *                   type: array
 *                   description: (Only present if `_embed=withTasks` is provided)
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       name:
 *                         type: string
 *                         example: "Integrate APIs"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getUsers);


module.exports = router;
