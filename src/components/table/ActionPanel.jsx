import { Amount } from "../Amount";

const ActionPanel = ({
  betAmount,
  chips,
  error,
  foldLoading,
  hasActiveBet,
  handleBet,
  handleCall,
  handleFold,
  handleRaise,
  isGameStarted,
  maxBet,
  setBetAmount,
}) => (
  <div className="panel">
    <h2>Action</h2>
    <div className="action-group">
      <div className="amount-control">
        <input
          type="range"
          min="1"
          max={maxBet}
          value={betAmount}
          step="1"
          disabled={!isGameStarted}
          onChange={(event) => setBetAmount(Number(event.target.value) || 0)}
        />
        <input
          type="number"
          min="1"
          max={maxBet}
          step="1"
          value={betAmount}
          disabled={!isGameStarted}
          onChange={(event) => setBetAmount(Number(event.target.value) || 0)}
          onBlur={(event) =>
            setBetAmount(
              Math.min(Math.max(Number(event.target.value) || 0, 1), maxBet)
            )
          }
        />
      </div>
      <div className="chip-row">
        {chips.map((chip) => (
          <button
            key={chip}
            className="chip"
            disabled={!isGameStarted}
            onClick={() =>
              setBetAmount((prev) => Math.min(Math.max(prev + chip, 1), maxBet))
            }
          >
            <Amount value={chip} />
          </button>
        ))}
      </div>
      <div className="actions">
        <button
          className="btn btn-secondary"
          onClick={handleCall}
          disabled={!isGameStarted || !hasActiveBet}
        >
          Call
        </button>
        <button
          className="btn btn-primary"
          onClick={handleBet}
          disabled={!isGameStarted}
        >
          Bet
        </button>
        <button
          className="btn btn-primary"
          onClick={handleRaise}
          disabled={!isGameStarted || !hasActiveBet}
        >
          Raise
        </button>
        <button
          className="btn btn-danger"
          onClick={handleFold}
          disabled={!isGameStarted || foldLoading}
        >
          {foldLoading ? "Folding..." : "Fold"}
        </button>
      </div>
      {error ? <div className="error">{error}</div> : null}
    </div>
  </div>
);

export default ActionPanel;
