const TableHeader = ({
  tableName,
  currentAccount,
  walletAddress,
  playersCount,
  roomId,
  isGameStarted,
}) => {
  const handleCopy = async (value) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
  };

  return (
    <header className="topbar">
      <div className="brand">
        <h1>
          MANO <span className="gold">Poker</span>
        </h1>
        <div className="addrBlock">
          <div className="addrRow">
            <b>Pool Address</b>
            <div className="addr">{currentAccount?.poolAddress || "—"}</div>
            {currentAccount?.poolAddress ? (
              <button
                className="copyBtn"
                type="button"
                onClick={() => handleCopy(currentAccount.poolAddress)}
              >
                Copy
              </button>
            ) : null}
          </div>
          <div className="addrRow">
            <b>Your Address</b>
            <div className="addr">{walletAddress || "—"}</div>
            {walletAddress ? (
              <button
                className="copyBtn"
                type="button"
                onClick={() => handleCopy(walletAddress)}
              >
                Copy
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="status">
        <div className="pill gold">
          <span className="dot" />
          {isGameStarted ? "Live Hand" : "Waiting"}
        </div>
        <div className="pill">{playersCount} Players</div>
        <div className="pill">
          Room <span className="mono">{roomId}</span>
        </div>
      </div>
    </header>
  );
};

export default TableHeader;
