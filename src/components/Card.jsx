function Card({ name, image, handleClick }) {
  return (
    <div onClick={handleClick} className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
    </div>
  );
}

export default Card;
