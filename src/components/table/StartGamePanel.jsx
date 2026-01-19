const StartGamePanel = ({ isGameStarted, startGameLoading, handleStartGame }) => (
  <article className="card">
    <div className="inner">
      <h2>Start Game</h2>
      <p className="kicker">Open the table when everyone is ready.</p>
      <div className="splitRow">
        <div className="pillSmall">
          <span className="dot" />
          {startGameLoading ? "Starting" : isGameStarted ? "Started" : "Waiting"}
        </div>
        <button
          className="btn primary"
          type="button"
          onClick={handleStartGame}
          disabled={isGameStarted || startGameLoading}
          style={{ flex: 1 }}
        >
          {isGameStarted
            ? "Game Started"
            : startGameLoading
            ? "Starting..."
            : "Start Game"}
        </button>
      </div>
    </div>
  </article>
);

export default StartGamePanel;
