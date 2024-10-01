import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; 
import App from '../src/App';
import '@testing-library/jest-dom/extend-expect'; 
import Login from '../src/Components/Login.jsx';



describe('Testa o componente "Login.js":', () => {
  test('1) O componente deve renderizar os inputs e botões corretamente.', () => {
    render(<App />);
    
    const playerName = screen.getByTestId('input-player-name');
    const playerEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');
    const toAddButton = screen.getByTestId('btn-to-add');

    expect(playerName).toBeInTheDocument();
    expect(playerEmail).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(toAddButton).toBeInTheDocument();
  });

  test('2) Deve ser exibido um input para "Nome do jogador", um input para "E-mail", um botão "Play" e um botão "Adicionar perguntas".', () => {
    render(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const playerEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');
    const ToAddButton = screen.getByTestId('btn-to-add');
    
    expect(playerName).toBeInTheDocument();
    expect(playerEmail).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(ToAddButton).toBeInTheDocument();
  });

  test('3) O botão "Play" deve estar indisponível caso os inputs não estejam preenchidos corretamente.', () => {
     render(<App />);
     const playerName = screen.getByTestId('input-player-name');
     const playerEmail = screen.getByTestId('input-gravatar-email');
     const playButton = screen.getByTestId('btn-play');
    
     expect(playButton).toBeDisabled();
     userEvent.type(playerName, 'Tibúrcio');
     expect(playButton).toBeDisabled();
     userEvent.type(playerEmail, 'tibúrcio@professor.com');
     expect(playButton).toBeEnabled();
   });


  test('4) A tela inicial deve conter um botão que leve para adicionar mais perguntas pro jogo.', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add" element={<div data-testid="settings-title">Settings Page</div>} />
      </Routes>
    </MemoryRouter>
  );

  const addButton = screen.getByTestId('btn-to-add');

  userEvent.click(addButton);

  const settingsTitle = await screen.findByTestId('settings-title');
  expect(settingsTitle).toBeInTheDocument();
});
})