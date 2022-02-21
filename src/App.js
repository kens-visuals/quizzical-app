import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { shuffleArray } from './helpers';

import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import QuizList from './components/QuizList';
import Footer from './components/Footer';

import './App.css';

function App() {
  const [newGame, setNewGame] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [gameOptions, setGameOptions] = useState({
    category: '9',
    quantity: '5',
    difficulty: 'easy',
  });

  useEffect(() => {
    async function trivias() {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${gameOptions.quantity}&category=${gameOptions.category}&type=multiple&difficulty=${gameOptions.difficulty}`
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
          heading: res.category,
        }));
      });
    }

    trivias();
  }, [newGame, gameOptions]);

  const getGameOptions = (name, value) => {
    setGameOptions((prevItems) => ({
      ...prevItems,
      [name]: value.toLowerCase(),
    }));
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/quizzical-app"
          element={<Home getGameOptions={getGameOptions} />}
        />
        <Route
          path="/quizlist"
          element={
            <QuizList
              questions={questions}
              setNewGame={setNewGame}
              setQuestions={setQuestions}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
