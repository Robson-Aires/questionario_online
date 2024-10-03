// models/index.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('questionario', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql', // ou 'postgres', 'sqlite', etc.
});

module.exports = sequelize;
