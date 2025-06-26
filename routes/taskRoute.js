const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Setup Database"
 *               description:
 *                 type: string
 *                 example: "Install PostgreSQL and connect"
 *               status:
 *                 type: string
 *                 example: "pending"
 *               userId:
 *                 type: integer
 *                 description: "foreign Key"
 *                 example: 5
 *               categoryIds:
 *                 type: array
 *                 description: "Array to category id's to get category data"
 *                 example: [1,2,6]
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', taskController.createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *       500:
 *         description: Server error
 */
router.get('/', taskController.getAllTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task retrieved
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get('/:id', taskController.getTaskById);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task by ID
 *     tags: [tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put('/:id', taskController.updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task by ID
 *     tags: [tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', taskController.deleteTask);

module.exports = router;
