// models/QuestRespondida.js questionario.js Resposta.js PerguntaOpcao.js Pergunta
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const QuestRespondida = sequelize.define('QuestRespondida', {
  ID_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario', // refere-se ao nome do model Usuario
      key: 'id'
    }
  },
  data_Hora_Ini: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Data_Hora_Fim: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Pontuacao: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, { timestamps: false });

module.exports = QuestRespondida;
