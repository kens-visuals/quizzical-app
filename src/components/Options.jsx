import OPTIONS from '../data';

import '../styles/Options.css';

export default function Options({ hasId, name, handleChange }) {
  const option = (item) =>
    OPTIONS[item].map((category) => (
      <option
        className="Options-option"
        key={hasId ? category.id : category}
        value={hasId ? category.id : category}
      >
        {hasId ? category.name : category}
      </option>
    ));

  return (
    <div className="Options">
      <label className="Options-label" id={`${name}-options`} value={name}>
        {name.replace(/^\w/gi, (el) => el.toUpperCase())}
      </label>
      <select
        name={name}
        id={`${name}-options`}
        className="Options-select"
        onChange={(e) => handleChange(e)}
      >
        {option(`trivia_${name}`)}
      </select>
    </div>
  );
}
