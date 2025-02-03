function GameModal({ header, message, onRestart }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>{header}</h1>
        <p>{message}</p>
        <button onClick={onRestart}>Play again</button>
      </div>
    </div>
  );
}

export default GameModal;
