import { convertUnicode } from '../helpers';

import '../styles/Quiz.css';

export default function Quiz({ question, answers }) {
  const answersDisplay = answers.map((answer, idx) => (
    <li className="Quiz-item" key={idx}>
      <button className="Quiz-btn">{`${convertUnicode(answer)}`}</button>
    </li>
  ));

  return (
    <div className="Quiz">
      <span className="Quiz-question">{convertUnicode(question)}</span>

      <ul className="Quiz-list">{answersDisplay}</ul>
    </div>
  );
}
