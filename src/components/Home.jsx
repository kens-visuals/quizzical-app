import { Link } from 'react-router-dom';

import '../styles/Home.css';

export default function HomePage() {
  return (
    <div className="Home">
      <h1 className="Home-heading">Quizzical</h1>
      <span className="Home-desc">Test Your Computer Science Knowledge</span>
      <Link to="/quizlist" className="Home-link">
        Start Quiz
      </Link>
    </div>
  );
}
