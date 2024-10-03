// models/Pergunta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Pergunta = sequelize.define('Pergunta', {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: false });

module.exports = Pergunta;
