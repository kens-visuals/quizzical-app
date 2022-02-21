import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Nav from './Nav';
import Quiz from './Quiz';

import '../styles/QuizList.css';

export default function QuizList({
  questions,
  setQuestions,
  setNewGame,
  gameOptions,
  setGameOptions,
}) {
  const [playAgain, setPlayAgain] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const selectAnswer = function (e, correctAnswer, id) {
    const { value } = e.target;

    setQuestions((oldQuestion) =>
      oldQuestion.map((question) => {
        return question.id === id
          ? {
              ...question,
              selectedAnswer: value,
              isCorrect: value === correctAnswer ? true : false,
            }
          : question;
      })
    );
  };

  const checkAnswers = function () {
    if (!questions.every((question) => question.selectedAnswer)) {
      setCorrectCount(0);
      alert('Answer all questions!');
      return;
    }

    for (const question of questions)
      if (question.isCorrect) setCorrectCount((prevCount) => prevCount + 1);

    setPlayAgain(true);
  };

  const handlePlayAgain = function () {
    setQuestions([]);
    setCorrectCount(0);
    setPlayAgain(false);
    window.scroll(0, 0);
    setNewGame((prevGame) => !prevGame);
  };

  const quizzes = questions.map((q) => [
    <Quiz
      data={q}
      key={uuidv4()}
      options={q.options}
      question={q.question}
      playAgain={playAgain}
      handleChange={selectAnswer}
    />,
  ]);

  return quizzes.length === 0 ? (
    <div className="QuizList-wrapper">
      <span className="QuizList-loader">Loading...</span>
    </div>
  ) : (
    <div className="QuizList">
      <Nav
        heading={questions[0].heading}
        quantity={gameOptions.quantity}
        setGameOptions={setGameOptions}
        handlePlayAgain={handlePlayAgain}
        difficulty={gameOptions.difficulty}
      />

      {quizzes.length !== 0 && quizzes}

      {!playAgain ? (
        <button className="QuizList-button" onClick={checkAnswers}>
          Check Answers
        </button>
      ) : (
        <div className="QuizList-wrapper">
          <span className="QuizList-score">
            You scored{' '}
            <span>
              {correctCount}/{quizzes.length}
            </span>
          </span>
          <button className="QuizList-button" onClick={handlePlayAgain}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
