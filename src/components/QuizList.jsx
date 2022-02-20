import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

import Quiz from './Quiz';

import '../styles/QuizList.css';

export default function QuizList({ questions, setQuestions, setNewGame }) {
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
    setPlayAgain(false);
    setNewGame((prevGame) => !prevGame);
    setCorrectCount(0);
    window.scroll(0, 0);
  };

  const quizzes = questions.map((q) => [
    <Quiz
      key={uuidv4()}
      data={q}
      question={q.question}
      options={q.options}
      handleChange={selectAnswer}
      playAgain={playAgain}
    />,
  ]);

  return quizzes.length === 0 ? (
    <div className="QuizList-wrapper">
      <span className="QuizList-loader">Loading...</span>
    </div>
  ) : (
    <div className="QuizList">
      <Link to="/quizzical-app">Quizzical</Link>

      <h1 className="QuizList-heading">{questions[0].heading}</h1>

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
