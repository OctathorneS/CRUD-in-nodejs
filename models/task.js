const { DataTypes } = require('sequelize');
const squelize = require('../config/db')
const User = require('./user')
const Task = squelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'tasks',
    timestamps: true
});

module.exports = Task;


