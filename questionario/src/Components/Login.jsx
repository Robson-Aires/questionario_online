import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import triviaLogo from '../images/20c190ce-68bc-4107-8125-ccf5a055d341.jpg';
import Logo from '../images/images (1).jpg';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Substitui history

  const handleClick = () => {
    navigate('/game'); // Use navigate ao invés de history.push
  };

  const handleClickAdd = () => {
    navigate('/add'); // Use navigate ao invés de history.push
  };

  return (
    <div className="divLoginPage">
      <img alt="logoTrivia" src={ triviaLogo } />
      <div className="loginDiv">
        <div className="harve">welcome</div>
        <div className="imagem">
          <img src={Logo} alt="" />
        </div>
        <input
          name="email"
          placeholder="Qual é o seu e-mail do gravatar?"
          value={ email }
          data-testid="input-gravatar-email"
          type="text"
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          name="name"
          placeholder="Qual é o seu nome?"
          value={ name }
          data-testid="input-player-name"
          type="text"
          onChange={ (e) => setName(e.target.value) }
        />
        <button
          disabled={ !name || !email }
          type="button"
          data-testid="btn-play"
          onClick={ handleClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-to-add"
          onClick={ handleClickAdd }
        >
          Adicionar perguntas
        </button>
      </div>
    </div>
  );
}

export default Login;
