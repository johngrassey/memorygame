//import { useState } from "react";
import Header from "./components/Header";

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
    </>
  );
}

export default App;
