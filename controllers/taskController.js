const Task = require('../models/task');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/CatchAsync');

//create task
exports.createTask = catchAsync(async (req, res, next) => {
  const { name, description, status, userId, categoryIds } = req.body;

  const task = await Task.create({ name, description, status, userId });

  if (!task) {
    return next(new AppError('Something went wrong', 500));
  }

  // if categoryIds provided, associate them via junction table
  if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
    await task.addCategories(categoryIds);
  }

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    taskId: task.id
  });
});


// Get All Tasks
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.findAll();
  res.status(200).json(tasks);
  if(!tasks){
    return next(new AppError('No Tasks found',404))
  }
});

// Get Task by ID
exports.getTaskById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);

  if (!task) return next(new AppError('Task not found', 404));

  res.status(200).json(task);
});

// Update Task
exports.updateTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status, userId } = req.body;

  const [updated] = await Task.update(
    { title, description, status, userId },
    { where: { id } }
  );

  if (!updated) return next(new AppError('Task not found', 404));

  const updatedTask = await Task.findByPk(id);
  res.status(200).json(updatedTask);
});

// Delete Task
exports.deleteTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await Task.destroy({ where: { id } });

  if (!deleted) return next(new AppError('Task not found', 404));

  res.status(200).json({ message: 'Task deleted successfully' });
});
