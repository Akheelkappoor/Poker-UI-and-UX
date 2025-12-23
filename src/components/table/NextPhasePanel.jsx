const NextPhasePanel = ({
  phase,
  nextPhase,
  readyCount,
  totalPlayers,
  isReady,
  allEqual,
  notReadyNames,
  onReady,
}) => (
  <div className="panel">
    <h2>Next Round</h2>
    <p className="label">Current: {phase}</p>
    <p className="label">Next: {nextPhase}</p>
    <div className="start-row">
      <span className="status-chip status-wait">
        {readyCount}/{totalPlayers} ready
      </span>
      <button className="btn btn-primary" onClick={onReady} disabled={isReady}>
        {isReady ? "Ready" : "Ready for Next"}
      </button>
    </div>
    {!allEqual ? (
      <div className="error">All players must have equal total bets.</div>
    ) : null}
    {notReadyNames.length > 0 ? (
      <div className="error">
        Waiting for {notReadyNames.join(", ")}
      </div>
    ) : null}
  </div>
);

export default NextPhasePanel;
