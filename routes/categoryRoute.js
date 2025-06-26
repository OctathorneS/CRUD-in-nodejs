const express = require('express');
const { postCategory ,getCategory , getCategoryById, updateCategory, deleteCategory} = require('../controllers/categoryController');
const router = express.Router();

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category (optionally with tasks)
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Home"
 *               tasks:
 *                 type: array
 *                 description: Optional list of task IDs to associate with this category
 *                 example: [1, 2, 3]
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request. Name is required or unique.
 */

router.post('/',postCategory);
/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *       500:
 *         description: Server error
 */
router.get('/', getCategory);
/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: _embed
 *         required: false
 *         description: Optionally embed related tasks (use value 'tasks')
 *         schema:
 *           type: string
 *           example: tasks
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */

router.get('/:id', getCategoryById);

/**
 * @swagger
 * /api/category/{id}:
 *   patch:
 *     summary: Update category by ID
 *     tags: [Categories]
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
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', updateCategory);
/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteCategory);

module.exports = router;