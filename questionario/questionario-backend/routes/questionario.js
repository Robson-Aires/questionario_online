// routes/questionario.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // Certifique-se de ter esse model
const Pergunta = require('../models/Pergunta');
const PerguntaOpcao = require('../models/PerguntaOpcao');
const Resposta = require('../models/Resposta');
const QuestRespondida = require('../models/QuestRespondida');



// Rota para adicionar uma nova pergunta e suas opções
router.post('/pergunta', async (req, res) => {
  const { descricaoPergunta, opcoesRespostas } = req.body;

  try {
      // Cria a pergunta
      const novaPergunta = await Pergunta.create({
          descricao: descricaoPergunta
      });

      // Adiciona as opções de resposta
      const opcoes = opcoesRespostas.map(opcao => ({
          descricao: opcao.descricaoOpcao,
          pontos: opcao.pontos,
          ID_pergunta: novaPergunta.id // Relaciona com a pergunta criada
      }));

      // Insere as opções no banco
      await PerguntaOpcao.bulkCreate(opcoes);

      res.status(201).json({ message: 'Pergunta e opções criadas com sucesso!' });
  } catch (error) {
      res.status(500).json({ message: 'Erro ao adicionar pergunta', error });
  }
});


// Função para calcular pontuação
const calcularPontuacao = (respostas) => {
  // Implementação de cálculo de pontuação com base nas respostas
  let pontuacao = 0;
  // Sua lógica para calcular a pontuação vai aqui
  return pontuacao;
};

// Função para calcular o tempo
const calcularTempo = (inicio, fim) => {
  // Calcule a diferença entre as duas datas
  const tempo = (new Date(fim) - new Date(inicio)) / 1000; // Tempo em segundos
  return tempo;
};

// Rota para iniciar o questionário
router.post('/iniciar', async (req, res) => {
  const { nome, email } = req.body;
  let usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    usuario = await Usuario.create({ nome, email });
  }

  const questionario = await QuestRespondida.create({
    ID_usuario: usuario.id,
    data_Hora_Ini: new Date(),
  });

  res.json({ idQuestionario: questionario.id });
});

// Rota para listar perguntas
router.get('/perguntas', async (req, res) => {
  const perguntas = await Pergunta.findAll({ include: PerguntaOpcao });
  res.json(perguntas);
});

// Rota para salvar a resposta
router.put('/resposta', async (req, res) => {
  const { idPergunta, idOpcao, idQuestionario } = req.body;
  await Resposta.create({ ID_Pergunta: idPergunta, ID_opcao: idOpcao, ID_Quest: idQuestionario });
  res.sendStatus(200);
});

// Rota para finalizar o questionário
router.post('/finalizar', async (req, res) => {
  const { idQuestionario, respostas } = req.body;
  
  const pontuacao = calcularPontuacao(respostas);

  await QuestRespondida.update({
    data_Hora_Fim: new Date(),
    Pontuacao: pontuacao
  }, { where: { id: idQuestionario } });

  const questionario = await QuestRespondida.findByPk(idQuestionario, {
    include: Usuario
  });

  res.json({
    nome: questionario.Usuario.nome,
    email: questionario.Usuario.email,
    pontuacao,
    dataInicio: questionario.data_Hora_Ini,
    dataFim: questionario.data_Hora_Fim,
    tempo: calcularTempo(questionario.data_Hora_Ini, questionario.data_Hora_Fim)
  });
});

module.exports = router;
