import { useState, useEffect } from "react";
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";
import StartPage from "./components/StartPage";
import GameModal from "./components/GameModal";

function App() {
  const TOTAL_POKEMON = 150;
  const [pokemon, setPokemon] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [win, setWin] = useState(false);

  const fetchPokemon = async () => {
    let pokemonIds = [];

    while (pokemonIds.length < difficulty) {
      const pokemonId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
      if (!pokemonIds.includes(pokemonId)) {
        pokemonIds.push(pokemonId);
      }
    }

    const pokemonPromises = pokemonIds.map(async (pokemonId) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        sprites: data.sprites.front_default,
        selected: false,
      };
    });

    const pokemonData = await Promise.all(pokemonPromises);
    setPokemon(pokemonData);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shufflePokemon = () => {
    setPokemon((prevPokemon) => shuffleArray([...prevPokemon]));
  };

  const handleCardClick = (id) => {
    const clickedPokemon = pokemon.find((poke) => poke.id === id);

    if (clickedPokemon.selected) {
      setShowModal(true);
    } else {
      setPokemon(
        pokemon.map((poke) =>
          poke.id === id ? { ...poke, selected: true } : poke
        )
      );
      incrementScore();
      if (currentScore + 1 === difficulty) {
        setWin(true);
        setShowModal(true);
      }
      shufflePokemon();
    }
  };

  const incrementScore = () => {
    setCurrentScore(currentScore + 1);
    if (currentScore >= highScore) {
      setHighScore(currentScore + 1);
    }
  };

  const resetGame = () => {
    setDifficulty("");
    setCurrentScore(0);
    setPokemon([]);
    setShowModal(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, [difficulty]);

  if (difficulty === "") {
    return <StartPage setDifficulty={setDifficulty} />;
  } else {
    return (
      <>
        <Header
          highScore={highScore}
          currentScore={currentScore}
          handleClick={resetGame}
          show={true}
        />
        <CardGrid pokemon={pokemon} handleClick={handleCardClick} />
        {showModal && (
          <GameModal
            header="Womp Womp!"
            message="You Lost The Game"
            onRestart={resetGame}
          />
        )}
        {win && (
          <GameModal
            header="Congratulations!"
            message="You Won The Game"
            onRestart={resetGame}
          />
        )}
      </>
    );
  }
}

export default App;
