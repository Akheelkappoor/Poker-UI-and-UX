const ActionPanel = ({
  foldLoading,
  hasActiveBet,
  handleBet,
  handleCall,
  handleFold,
  handleAllIn,
  handleRaise,
  isGameStarted,
  stack,
}) => {
  const showCall = hasActiveBet;
  const showBet = !hasActiveBet;
  const showRaise = hasActiveBet;

  return (
    <article className="card actionPanel">
      <div className="inner">
        <h2>Action</h2>
        <p className="kicker">Set amount, then choose an action.</p>
        <div className="actionButtons">
          <button
            className="btn danger"
            onClick={handleFold}
            disabled={!isGameStarted || foldLoading}
          >
            {foldLoading ? "Folding..." : "Fold"}
          </button>
          {showCall ? (
            <button
              className="btn"
              onClick={handleCall}
              disabled={!isGameStarted || !hasActiveBet}
            >
              Call
            </button>
          ) : null}
          {showBet ? (
            <button
              className="btn primary"
              onClick={handleBet}
              disabled={!isGameStarted}
            >
              Bet
            </button>
          ) : null}
          {showRaise ? (
            <button
              className="btn primary"
              onClick={handleRaise}
              disabled={!isGameStarted || !hasActiveBet}
            >
              Raise
            </button>
          ) : null}
          <button
            className="btn primary"
            onClick={handleAllIn}
            disabled={!isGameStarted || stack <= 0}
          >
            All in
          </button>
        </div>
      </div>
    </article>
  );
};

export default ActionPanel;
