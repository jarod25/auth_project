const { DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = require('../config/db');

const User = sequelize.define('User', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    }
});

module.exports = User;

