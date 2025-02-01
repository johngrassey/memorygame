import { useState, useEffect } from "react";

function Pokemon() {
  const NUMBER_OF_POKEMON = 16;
  const TOTAL_POKEMON = 1025;
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
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
        };
      });

      const pokemonData = await Promise.all(pokemonPromises);
      setPokemon(pokemonData);
      console.log(pokemon);
    };

    fetchPokemon();
  }, []);

  return (
    <div>
      <ul>
        {pokemon.map((poke) => (
          <li key={poke.id}>
            <h2>{poke.name}</h2>
            <img src={poke.sprites} alt={poke.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pokemon;
