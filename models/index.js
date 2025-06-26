const sequelize = require('../config/db');
const User = require('./user');
const Task = require('./task');

// Associations
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Scope definition after associations
User.addScope('withTasks', {
  include: [Task]
});

module.exports = { sequelize, User, Task };
