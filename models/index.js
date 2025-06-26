const sequelize = require('../config/db');
const User = require('./user');
const Task = require('./task');
const Category = require('./category')
// Associations
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

Task.belongsToMany(Category,{through:'TaskCategories',foreignKey:'taskId'});
Category.belongsToMany(Task,{through:'TaskCategories',foreignKey:'categoryId'});

// Scope definition after associations
User.addScope('withTasks', {
  include: [Task]
});

module.exports = { sequelize, User, Task };
