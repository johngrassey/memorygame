function Header({ currentScore, highScore }) {
  return (
    <header>
      <h1>PokéMemory</h1>
      <div className="score">
        <h3>Current Score: {currentScore}</h3>
        <h3>High Score: {highScore}</h3>
      </div>
    </header>
  );
}

export default Header;
