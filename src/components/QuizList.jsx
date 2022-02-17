import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Quiz from './Quiz';

import '../styles/QuizList.css';

export default function QuizList() {
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function trivias() {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
      );
      const resJson = await res.json();

      setAnswers(resJson.results);
    }
    trivias();
  }, []);

  const shuffledArray = (arr) => arr.sort(() => 0.5 - Math.random());

  const quizAnswers = answers.map((answer) => (
    <Quiz
      key={uuidv4()}
      question={answer.question}
      answers={shuffledArray([
        answer.correct_answer,
        ...answer.incorrect_answers,
      ])}
    />
  ));

  return (
    <div className="QuizList">
      <div className="QuizList-btn-wrapper">{quizAnswers}</div>
      <button className="QuizList-button">Check Answers</button>
    </div>
  );
}
