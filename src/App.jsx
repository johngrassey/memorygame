import { useState, useEffect } from "react";
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";

function App() {
  const NUMBER_OF_POKEMON = 5;
  const TOTAL_POKEMON = 1025;
  const [pokemon, setPokemon] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const fetchPokemon = async () => {
    let pokemonIds = [];

    while (pokemonIds.length < NUMBER_OF_POKEMON) {
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
      resetGame();
    } else {
      setPokemon(
        pokemon.map((poke) =>
          poke.id === id ? { ...poke, selected: true } : poke
        )
      );
      incrementScore();
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
    setCurrentScore(0);
    fetchPokemon();
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <>
      <Header highScore={highScore} currentScore={currentScore} />
      <CardGrid pokemon={pokemon} handleClick={handleCardClick} />
    </>
  );
}

export default App;
