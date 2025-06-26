const {User} = require('../models/index');
const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');
const Task = require('../models/task');
const sequelize = require('../config/db');

// Get all users
// exports.getAllUsers = CatchAsync(async (req, res, next) => {

//   const users = await User.findAll();
//   if (!users) {
//     return next(new Error('No Users Found', 404))
//   }
//   else {
//     res.status(200).json(users);
//   }
// });

// Create new user
exports.createUser = CatchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      data:user,
      message:"User Created Successfully"
    });
  }
  else {
    return next(new AppError('Something went wrong', 400))
  }

});

//Updating user

exports.updateUser = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const [updated] = await User.update(
    { name, email, password },
    { where: { id } }
  );

  if (updated) {
    const updatedUser = await User.findOne({
      where: {
        id
      }
    });
    res.status(200).json(updatedUser);
  } else {
    return next(new AppError('User Not Updated', 404))
  }
});



exports.deleteUser = CatchAsync(async (req, res, next) => {
  const { id } = req.params;

  console.log("Deleting user with name:", id);


  const deleted = await User.destroy({
    where: { id }
  });

  if (deleted) {
    res.status(200).json({ message: `User deleted successfully` });
  } else {
    return next(new AppError('User Not found', 404))
  }
});



exports.getUsers = CatchAsync(async (req, res, next) => {

  const { _embed } = req.query;
  const {id} = req.params;
  if (_embed) {
    const users = await User.scope(`${_embed}`).findOne({
      where: { id }
    });
    if (!users) {
      return next(new AppError('User not found', 404));
    }
    res.status(200).json(users);
  }
  else {
    const users = await User.findOne();
    res.status(200).json(users);
    if (!users) {
      return next(new Error('Users not found with tasks'), 404)
    }
  }
});

exports.postUserWithTasks = CatchAsync(async (req, res, next) => {
  const { name, email, password, tasks } = req.body;

  const t = await sequelize.transaction();

  try {
    const user = await User.create({ name, email, password }, { transaction: t });
    if (user) {

      if (tasks && tasks.length > 0) {
        const taskData = tasks.map(task => ({
          name: task.name,
          description: task.description,
          status: task.status,
          userId: user.id
        }));

        await Task.bulkCreate(taskData, { transaction: t });
      }

      await t.commit();
      res.status(200).json({
        success: true,
        message: user
      })
    }

    else {
      return next(new AppError('Something went wrong', 400))
    }
  } catch (error) {
    await t.rollback();
    next(new AppError(error.message, 500));
  }
});