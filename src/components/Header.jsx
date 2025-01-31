function Header({ currentScore, highScore }) {
  return (
    <>
      <div>Current Score: {currentScore}</div>
      <div>High Score: {highScore}</div>
    </>
  );
}

export default Header;
