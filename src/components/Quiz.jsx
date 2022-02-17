import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { convertUnicode } from '../helpers';

import '../styles/Quiz.css';

export default function Quiz({ question, answers }) {
  const [currAnswer, setCurrAnswer] = useState(-1);

  console.log(answers);

  const answersDisplay = answers.map((answer, idx) => (
    <li className="Quiz-item" key={uuidv4()}>
      <button
        onClick={() => setCurrAnswer(idx)}
        className={idx === currAnswer ? 'Quiz-btn active' : 'Quiz-btn'}
      >{`${convertUnicode(answer)}`}</button>
    </li>
  ));

  return (
    <div className="Quiz">
      <span className="Quiz-question">{convertUnicode(question)}</span>

      <ul className="Quiz-list">{answersDisplay}</ul>
    </div>
  );
}
