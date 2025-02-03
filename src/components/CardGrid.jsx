import Card from "./Card";

function CardGrid({ pokemon, handleClick }) {
  return (
    <>
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
      <p className="help">
        Keep selectiong Pokémon, but don't select the same one twice!
      </p>
    </>
  );
}

export default CardGrid;
