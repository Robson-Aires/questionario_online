import React, { Component } from 'react';
import '../css/Game.css';
// import Header from '../Components/Header';

class Game extends Component {
  state = {
    idx: 0,
    showAnswers: false,
    resps: [],
    showNext: false,
    questions: [
      {
        category: "General Knowledge",
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["London", "Berlin", "Rome"],
      },
      {
        category: "Science",
        question: "What planet is known as the Red Planet?",
        correct_answer: "Mars",
        incorrect_answers: ["Earth", "Jupiter", "Venus"],
      },
      // Adicione mais perguntas aqui
    ],
  };

  componentDidMount() {
    // Carrega as respostas embaralhadas da primeira pergunta
    this.loadQuestion();
  }

  loadQuestion = () => {
    const { idx, questions } = this.state;
    const question = questions[idx];
    const allAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];

    this.setState({
      resps: this.shuffleArray(allAnswers),
      correct: question.correct_answer,
    });
  };

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  handleClick = ({ target }) => {
    this.setState({ showAnswers: true, showNext: true });
    const { name } = target;
    const { correct } = this.state;
    if (name === correct) {
      alert('Correct Answer!');
    } else {
      alert('Wrong Answer!');
    }
  };

  handleNext = () => {
    this.setState((prev) => ({
      idx: prev.idx + 1,
      showAnswers: false,
      showNext: false,
    }), this.loadQuestion); // Carrega a próxima pergunta
  };

  render() {
    const { questions, idx, resps, showAnswers, showNext } = this.state;
    if (questions.length > 0 && questions[idx]) {
      return (
        <>
          {/* <Header /> */}
          <div className="div__game">
            <section className="section__question">
              <h2 className={questions[idx].category} data-testid="question-category">
                {questions[idx].category}
              </h2>
              <p data-testid="question-text">{questions[idx].question}</p>
            </section>
            <div className="div__answer" data-testid="answer-options">
              {resps.map((resp, idxx) => (
                <button
                  onClick={this.handleClick}
                  name={resp}
                  className={showAnswers && (resp === questions[idx].correct_answer
                    ? 'correct-answer' : 'wrong-answer')}
                  data-testid={resp === questions[idx].correct_answer
                    ? 'correct-answer' : `wrong-answer-${idxx}`}
                  type="button"
                  key={idxx}
                >
                  {resp}
                </button>
              ))}
              {showNext && (
                <button
                  onClick={this.handleNext}
                  type="button"
                  data-testid="btn-next"
                  className="button__next"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </>
      );
    }
    return <div>Loading...</div>;
  }
}

export default Game;
