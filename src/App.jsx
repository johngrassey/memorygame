import { useState, useEffect } from "react";
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";

function App() {
  let currentScore = 0;
  let highScore = 0;

  const NUMBER_OF_POKEMON = 16;
  const TOTAL_POKEMON = 1025;
  const [pokemon, setPokemon] = useState([]);

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

  useEffect(() => {
    fetchPokemon();
  }, []);

  const shufflePokemon = () => {
    const shuffledPokemon = pokemon.sort(() => Math.random() - 0.5);
    setPokemon(shuffledPokemon);
  };

  const selectPokemon = (id) => {
    const updatedPokemon = pokemon.map((poke) => {
      if (poke.id === id) {
        if (poke.selected) {
          resetScore();
          shufflePokemon();
        } else {
          incrementScore();
          poke.selected = true;
        }
      }
      return poke;
    });

    setPokemon(updatedPokemon);
  };

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
      <CardGrid pokemon={pokemon} />
    </>
  );
}

export default App;
