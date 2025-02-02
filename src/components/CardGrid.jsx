import Card from "./card";

function CardGrid({ pokemon, handleClick }) {
  return (
    <div className="cardgrid">
      {pokemon.map((poke) => (
        <Card
          key={poke.id}
          name={poke.name}
          image={poke.sprites}
          handleClick={() => handleClick(poke.id)}
        />
      ))}
    </div>
  );
}

export default CardGrid;
