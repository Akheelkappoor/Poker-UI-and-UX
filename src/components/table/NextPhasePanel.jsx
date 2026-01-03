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
  <article className="card next-round-card">
    <div className="inner">
      <h2>Next Round</h2>
      <div className="splitRow" style={{ marginTop: 12 }}>
        <div className="pillSmall">
          {readyCount}/{totalPlayers} Ready
        </div>
        <button
          className="btn primary"
          type="button"
          onClick={isShowdown ? onShowdown : onReady}
          disabled={isShowdown ? false : isReady || nextLoading}
          style={{ flex: 1 }}
        >
          {isShowdown
            ? "Showdown"
            : nextLoading
            ? "Sending..."
            : isReady
            ? "Ready"
            : "Ready for Next"}
        </button>
      </div>
      {!allEqual ? (
        <div className="feedItem" style={{ marginTop: 10 }}>
          <span>All players must have equal total bets.</span>
        </div>
      ) : null}
      {notReadyNames.length > 0 ? (
        <div className="feedItem" style={{ marginTop: 10 }}>
          <span>Waiting for {notReadyNames.join(", ")}</span>
        </div>
      ) : null}
    </div>
  </article>
);

export default NextPhasePanel;
