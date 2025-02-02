import Card from "./card";

function CardGrid({ pokemon }) {
  return (
    <div className="cardgrid">
      {pokemon.map((poke) => (
        <Card key={poke.id} name={poke.name} image={poke.sprites} />
      ))}
    </div>
  );
}

export default CardGrid;
