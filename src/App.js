import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import QuizList from './components/QuizList';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/quizzical-app" element={<Home />} />
        <Route path="/quizlist/" element={<QuizList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
