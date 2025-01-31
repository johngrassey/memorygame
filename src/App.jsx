//import { useState } from "react";
import Header from "./components/Header";

function App() {
  let currentScore = 0;
  let highScore = 0;

  return (
    <>
      <Header highScore={highScore} currentScore={currentScore} />
    </>
  );
}

export default App;
