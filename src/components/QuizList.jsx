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
        'https://opentdb.com/api.php?amount=5&category=18&type=multiple'
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
  }

  const quizzes = questions.map((q) => [
    <Quiz
      key={uuidv4()}
      data={q}
      question={q.question}
      options={q.options}
      handleChange={selectAnswer}
    />,
  ]);

  return (
    <div className="QuizList">
      <div>
        {quizzes.length !== 0 && quizzes}

        {!playAgain ? (
          <div className="checkAnswers">
            {quizzes.length !== 0 && (
              <button className="btn-quiz" onClick={checkAnswers}>
                Check Answers
              </button>
            )}
          </div>
        ) : (
          <div className="playAgainBtnDiv">
            <span className="score">
              You scored <span>{correctCount}/5</span> correct answers
            </span>
            <button className="btn-quiz" onClick={handlePlayAgain}>
              Play again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
