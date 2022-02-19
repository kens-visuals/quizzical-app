import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Quiz from './Quiz';
import { shuffleArray } from '../helpers';

import '../styles/QuizList.css';

export default function QuizList() {
  const [newGame, setNewGame] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [playAgain, setPlayAgain] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    async function trivias() {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
      );
      const resJson = await res.json();

      setQuestions(() => {
        return resJson.results.map((res) => ({
          id: uuidv4(),
          question: res.question,
          correctAnswer: res.correct_answer,
          options: shuffleArray([...res.incorrect_answers, res.correct_answer]),
          selectedAnswer: '',
          isCorrect: false,
        }));
      });
    }

    trivias();
  }, [newGame]);

  function selectAnswer(e, correctAnswer, id) {
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
  }

  function checkAnswers() {
    if (!questions.every((question) => question.selectedAnswer)) {
      setCorrectCount(0);
      alert('Answer all questions!');
      return;
    }

    for (const question of questions)
      if (question.isCorrect) setCorrectCount((prevCount) => prevCount + 1);

    setPlayAgain(true);
  }

  function handlePlayAgain() {
    setQuestions([]);
    setPlayAgain(false);
    setNewGame((prevGame) => !prevGame);
    setCorrectCount(0);
    window.scroll(0, 0);
  }

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
      <h1 className="QuizList-heading">Computer Science</h1>

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
