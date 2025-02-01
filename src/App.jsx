//import { useState } from "react";
import Header from "./components/Header";
import Pokemon from "./Pokemon";

function App() {
  let currentScore = 0;
  let highScore = 0;

  const incrementScore = () => {
    currentScore += 1;
    highScore = Math.max(currentScore, highScore);
  };

  const resetScore = () => {
    currentScore = 0;
  };

  return (
    <>
      <Header highScore={highScore} currentScore={currentScore} />
      <Pokemon />
    </>
  );
}

export default App;
