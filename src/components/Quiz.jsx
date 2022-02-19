import { convertUnicode } from '../helpers';

import '../styles/Quiz.css';

export default function Quiz(props) {
  const { data, handleChange } = props;

  console.log(data);

  const answersDisplay = data.options.map((option) => (
    <span
      key={option}
      // className={
      //   data.correctAnswer === option && props.playAgain ? 'correctAnswer' : ''
      // }
    >
      <input
        type="radio"
        // disabled={props.playAgain ? true : false}
        checked={data.selectedAnswer === option}
        onChange={(e) => handleChange(e, data.correctAnswer, data.id)}
        value={option}
        id={data.id + option}
        name={data.id}
      />
      <label htmlFor={data.id + option}>{convertUnicode(option)}</label>
    </span>
  ));

  return (
    <div className="Quiz">
      <span className="Quiz-question">{convertUnicode(data.question)}</span>

      <ul className="Quiz-list">{answersDisplay}</ul>
    </div>
  );
}
