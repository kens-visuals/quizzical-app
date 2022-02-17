import { useState, useEffect } from 'react';

import Quiz from './Quiz';

import '../styles/QuizList.css';

export default function QuizList() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function trivias() {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
      );
      const resJson = await res.json();

      setResults(resJson.results);
    }

    trivias();
  }, []);

  const [results, setResults] = useState([]);

  const quizDisplay = results.map((result, idx) => (
    <Quiz
      key={idx}
      question={result.question}
      answers={[result.correct_answer, ...result.incorrect_answers]}
    />
  ));

  return (
    <div className="QuizList">
      <div className="QuizList-btn-wrapper">{quizDisplay}</div>
      <button className="QuizList-button">Check Answers</button>
    </div>
  );
}
