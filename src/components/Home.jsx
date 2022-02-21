import { Link } from 'react-router-dom';

import Options from './Options';

import '../styles/Home.css';

export default function HomePage({ getGameOptions }) {
  const handleChange = function (e) {
    const { name, value } = e.target;

    getGameOptions(name, value);
  };

  return (
    <div className="Home">
      <h1 className="Home-heading">Quizzical</h1>
      <span className="Home-desc">Test Your Skills</span>

      <div className="Home-wrapper">
        <Options handleChange={handleChange} name={'quantity'} hasId={false} />
        <Options
          handleChange={handleChange}
          name={'difficulty'}
          hasId={false}
        />
        <Options handleChange={handleChange} name={'category'} hasId />
      </div>

      <Link to="/quizlist" className="Home-link">
        Start Quiz
      </Link>
    </div>
  );
}
