const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const PerguntaOpcao = sequelize.define('PerguntaOpcao', {
  ID_pergunta: DataTypes.INTEGER,
  descricao: DataTypes.STRING,
  Pontos: DataTypes.INTEGER,
}, { timestamps: false });

module.exports = PerguntaOpcao;
