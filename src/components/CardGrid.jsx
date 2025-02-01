import Pokemon from "../Pokemon";
import Card from "./card";

function CardGrid() {
  return (
    <div class="cardgrid">
      {Pokemon.map((pokemon) => (
        <Card
          key={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.front_default}
        />
      ))}
    </div>
  );
}
