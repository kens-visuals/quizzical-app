import { convertUnicode } from '../helpers';

import '../styles/Quiz.css';

export default function Quiz(props) {
  const { data, handleChange } = props;

  const answersDisplay = data.options.map((option) => (
    <span
      key={option}
      className={`Quiz-span ${
        data.correctAnswer === option && props.playAgain ? 'correctAnswer' : ''
      }`}
    >
      <input
        className="Quiz-input"
        type="radio"
        disabled={props.playAgain ? true : false}
        checked={data.selectedAnswer === option}
        onChange={(e) => handleChange(e, data.correctAnswer, data.id)}
        value={option}
        id={data.id + option}
        name={data.id}
      />
      <label className="Quiz-label" htmlFor={data.id + option}>
        {convertUnicode(option)}
      </label>
    </span>
  ));

  return (
    <div className="Quiz">
      <span className="Quiz-question">{convertUnicode(data.question)}</span>

      <div className={`Quiz-answers ${props.playAgain ? 'playAgain' : ''}`}>
        {answersDisplay}
      </div>
    </div>
  );
}
