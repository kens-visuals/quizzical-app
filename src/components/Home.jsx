import { Link } from 'react-router-dom';

import '../styles/Home.css';

export default function HomePage({ getGameOptions }) {
  const handleChange = function (e) {
    const { name, value } = e.target;

    getGameOptions(name, value);
  };

  return (
    <div className="Home">
      <h1 className="Home-heading">Quizzical</h1>
      <span className="Home-desc">Test Your Computer Science Knowledge</span>

      <label htmlFor="category-select">Quantity:</label>

      <select
        id="quantity-select"
        name="quantity"
        onChange={(e) => handleChange(e)}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>

      <label htmlFor="difficulty-select">Difficulty:</label>

      <select
        id="difficulty-select"
        name="difficulty"
        onChange={(e) => handleChange(e)}
      >
        <option value="easy">Easy</option>
        <option defaultValue="medium" value="medium">
          Medium
        </option>
        <option value="hard">Hard</option>
      </select>

      <label htmlFor="category-select">Category:</label>

      <select
        id="category-select"
        name="category"
        onChange={(e) => handleChange(e)}
      >
        <option value={9}>General Knowledge</option>
        <option value={10}>Entertainment: Books</option>
        <option value={11}>Entertainment: Film</option>
      </select>

      <Link to="/quizlist" className="Home-link">
        Start Quiz
      </Link>
    </div>
  );
}
