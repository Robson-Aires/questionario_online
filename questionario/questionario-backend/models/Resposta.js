// models/Resposta.js PerguntaOpcao.js Pergunta
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Resposta = sequelize.define('Resposta', {
  ID_Pergunta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Pergunta', // refere-se ao nome do model Pergunta
      key: 'id'
    }
  },
  ID_opcao: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PerguntaOpcao', // refere-se ao nome do model PerguntaOpcao
      key: 'id'
    }
  },
  ID_Quest: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'QuestRespondida', // refere-se ao nome do model QuestRespondida
      key: 'id'
    }
  },
}, { timestamps: false });

module.exports = Resposta;
