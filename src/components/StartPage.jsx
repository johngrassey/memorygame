function StartPage({ setDifficulty }) {
  return (
    <div className="startpage">
      <h1>Welcome to PokéMemory</h1>
      <p>Please select your difficulty</p>
      <div className="startbtns">
        <button onClick={() => setDifficulty(6)}>EASY</button>
        <button onClick={() => setDifficulty(12)}>MEDIUM</button>
        <button onClick={() => setDifficulty(18)}>HARD</button>
      </div>
    </div>
  );
}

export default StartPage;
