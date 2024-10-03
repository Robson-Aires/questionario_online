import React, { useState } from 'react';
import axios from 'axios';

function AddQuestion() {
  const [descricaoPergunta, setDescricaoPergunta] = useState('');
  const [opcoesRespostas, setOpcoesRespostas] = useState([{ descricaoOpcao: '', pontos: 0 }]);

  const handleAddOption = () => {
    setOpcoesRespostas([...opcoesRespostas, { descricaoOpcao: '', pontos: 0 }]);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...opcoesRespostas];
    newOptions[index][field] = value;
    setOpcoesRespostas(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/pergunta', {
        descricaoPergunta,
        opcoesRespostas,
      });
      console.log(response.data);
      // Reset the form or show success message
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descrição da Pergunta"
        value={descricaoPergunta}
        onChange={(e) => setDescricaoPergunta(e.target.value)}
        required
      />
      {opcoesRespostas.map((opcao, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Opção"
            value={opcao.descricaoOpcao}
            onChange={(e) => handleOptionChange(index, 'descricaoOpcao', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Pontos"
            value={opcao.pontos}
            onChange={(e) => handleOptionChange(index, 'pontos', Number(e.target.value))}
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddOption}>
        Adicionar Opção
      </button>
      <button type="submit">Adicionar Pergunta</button>
    </form>
  );
}

export default AddQuestion;
