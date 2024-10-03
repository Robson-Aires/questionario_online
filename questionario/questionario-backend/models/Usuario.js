const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Usuario = sequelize.define('Usuario', {
  nome: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Para garantir que o email é único
  },
}, { timestamps: false });

module.exports = Usuario;
