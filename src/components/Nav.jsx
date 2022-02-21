import { Link } from 'react-router-dom';

import '../styles/Nav.css';

export default function Nav(props) {
  return (
    <nav className="Nav">
      <Link
        className="Nav-link"
        to="/quizzical-app"
        onClick={() => {
          props.handlePlayAgain();
          props.setGameOptions({
            category: '9',
            quantity: '5',
            difficulty: 'easy',
          });
        }}
      >
        Quizzical
      </Link>

      <span className="Nav-span">Quantity: {props.quantity}</span>
      <span className="Nav-span">
        Difficulty:{' '}
        {props.difficulty.replace(/^\w/gi, (el) => el.toUpperCase())}
      </span>
      <span className="Nav-span">
        Category: {props.heading.replace(/Entertainment:/gi, '')}
      </span>
    </nav>
  );
}
