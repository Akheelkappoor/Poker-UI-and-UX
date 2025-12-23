const StartGamePanel = ({ isGameStarted, startGameLoading, handleStartGame }) => (
  <div className="panel start-panel">
    <h2>Start Game</h2>
    <p className="label">Open the table when everyone is ready.</p>
    <div className="start-row">
      <span
        className={`status-chip ${isGameStarted ? "status-live" : "status-wait"}`}
      >
        {startGameLoading ? "Starting..." : isGameStarted ? "Started" : "Waiting"}
      </span>
      <button
        className="btn btn-primary"
        onClick={handleStartGame}
        disabled={isGameStarted || startGameLoading}
      >
        {isGameStarted
          ? "Game Started"
          : startGameLoading
          ? "Starting..."
          : "Start Game"}
      </button>
    </div>
  </div>
);

export default StartGamePanel;
