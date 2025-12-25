const NextPhasePanel = ({
  phase,
  nextPhase,
  isShowdown,
  readyCount,
  totalPlayers,
  isReady,
  allEqual,
  notReadyNames,
  nextLoading,
  onReady,
  onShowdown,
}) => (
  <div className="panel">
    <h2>Next Round</h2>
    <p className="label">Current: {phase}</p>
    <p className="label">Next: {nextPhase}</p>
    <div className="start-row start-row-stack">
      <span className="status-chip status-wait">
        {readyCount}/{totalPlayers} ready
      </span>
      <button
        className="btn btn-primary"
        onClick={isShowdown ? onShowdown : onReady}
        disabled={isShowdown ? false : isReady || nextLoading}
      >
        {isShowdown
          ? nextLoading
            ? "Sending..."
            : "Showdown"
          : nextLoading
          ? "Sending..."
          : isReady
          ? "Ready"
          : "Ready for Next"}
      </button>
    </div>
    <div className="note-stack">
      {!allEqual ? (
        <div className="note">All players must have equal total bets.</div>
      ) : null}
      {notReadyNames.length > 0 ? (
        <div className="note">Waiting for {notReadyNames.join(", ")}</div>
      ) : null}
    </div>
  </div>
);

export default NextPhasePanel;
