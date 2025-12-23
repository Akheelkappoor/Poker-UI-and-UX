const TableHeader = ({
  tableName,
  currentAccount,
  walletAddress,
  playersCount,
  roomId,
  isGameStarted,
}) => (
  <div className="top-bar">
    <div className="brand">
      <h1>{tableName}</h1>
      <div className="header-meta">
        <div className="meta-row">
          <span className="label">Pool address</span>
          <span>{currentAccount?.poolAddress || "—"}</span>
          {currentAccount?.poolAddress ? (
            <button
              className="btn btn-ghost"
              onClick={() =>
                navigator.clipboard.writeText(currentAccount.poolAddress)
              }
            >
              Copy
            </button>
          ) : null}
        </div>
        <div className="meta-row">
          <span className="label">Your address</span>
          <span>{walletAddress || "—"}</span>
          {walletAddress ? (
            <button
              className="btn btn-ghost"
              onClick={() => navigator.clipboard.writeText(walletAddress)}
            >
              Copy
            </button>
          ) : null}
        </div>
      </div>
    </div>
    <div className="status">
      <span className="status-pill">{isGameStarted ? "Live Hand" : "Waiting"}</span>
      <span className="label">
        {playersCount} players · Room {roomId}
      </span>
    </div>
  </div>
);

export default TableHeader;
