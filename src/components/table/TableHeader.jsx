import { useState } from "react";

const TableHeader = ({
  tableName,
  currentAccount,
  walletAddress,
  playersCount,
  roomId,
  isGameStarted,
  phase,
  nextPhase,
  showInfo,
  onToggleInfo,
  handleLeave,
  leaveLoading,
}) => {
  const [showPoolAddress, setShowPoolAddress] = useState(false);
  const [showWalletAddress, setShowWalletAddress] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const copyText = async (value) => {
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

  const handleCopyRoom = () => copyText(roomId);

  const formatAddress = (value) => {
    if (!value) return "—";
    if (value.length <= 12) return value;
    return `${value.slice(0, 6)}…${value.slice(-4)}`;
  };

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brandRow">
          <h1>
            MANO <span className="gold">Poker</span>
          </h1>
          <div className="headerIcons">
            <button
              className={`iconBtn${showDetails ? " active" : ""}`}
              type="button"
              aria-label={showDetails ? "Hide room details" : "Show room details"}
              aria-expanded={showDetails}
              onClick={() => setShowDetails((value) => !value)}
              title={showDetails ? "Hide room details" : "Room details"}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 10v6" />
                <path d="M12 7h.01" />
              </svg>
            </button>
            <button
              className={`iconBtn${showInfo ? " active" : ""}`}
              type="button"
              onClick={onToggleInfo}
              aria-expanded={showInfo}
              aria-label={showInfo ? "Hide table info" : "Show table info"}
              title="Table info"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 3l9 9-9 9-9-9 9-9Z" />
                <path d="M12 9v6" />
                <path d="M12 7h.01" />
              </svg>
            </button>
            <button
              className="leaveBtn"
              type="button"
              onClick={handleLeave}
              disabled={leaveLoading}
              aria-label={leaveLoading ? "Leaving table" : "Leave table"}
              title={leaveLoading ? "Leaving..." : "Leave table"}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M15 5h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4" />
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
              </svg>
              <span className="sr-only">
                {leaveLoading ? "Leaving..." : "Leave table"}
              </span>
            </button>
          </div>
        </div>
        {showDetails ? (
          <div className="addrBlock">
          <div className="addrRow">
            <div className="addrLabel">
              <b>Pool Address</b>
            </div>
            <div className="addrCard">
              <span
                className={`addrValue${showPoolAddress ? " reveal" : ""}`}
              >
                {showPoolAddress
                  ? currentAccount?.poolAddress || "—"
                  : formatAddress(currentAccount?.poolAddress)}
              </span>
              {currentAccount?.poolAddress ? (
                <div className="addrActions">
                  <button
                    className={`eyeBtn${showPoolAddress ? " active" : ""}`}
                    type="button"
                    aria-label={
                      showPoolAddress ? "Hide pool address" : "Show pool address"
                    }
                    aria-pressed={showPoolAddress}
                    onClick={() => setShowPoolAddress((value) => !value)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                      <circle cx="12" cy="12" r="3.5" />
                    </svg>
                  </button>
                  <button
                    className="copyBtn compact"
                    type="button"
                    onClick={() => copyText(currentAccount.poolAddress)}
                  >
                    Copy
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="addrRow">
            <div className="addrLabel">
              <b>Your Address</b>
            </div>
            <div className="addrCard">
              <span
                className={`addrValue${showWalletAddress ? " reveal" : ""}`}
              >
                {showWalletAddress
                  ? walletAddress || "—"
                  : formatAddress(walletAddress)}
              </span>
              {walletAddress ? (
                <div className="addrActions">
                  <button
                    className={`eyeBtn${showWalletAddress ? " active" : ""}`}
                    type="button"
                    aria-label={
                      showWalletAddress ? "Hide your address" : "Show your address"
                    }
                    aria-pressed={showWalletAddress}
                    onClick={() => setShowWalletAddress((value) => !value)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                      <circle cx="12" cy="12" r="3.5" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        ) : null}
      </div>
      <div className="status">
        <div className="pill statusPill">
          <span className="dot" />
          {isGameStarted ? "Live Hand" : "Waiting"}
        </div>
        <div className="statusMeta">
          <span>{playersCount} players</span>
          <span className="metaSep">•</span>
          <button className="roomChip" type="button" onClick={handleCopyRoom}>
            Room <span className="mono">{roomId}</span>
          </button>
        </div>
        {isGameStarted ? (
          <div className="pill phasePill">
            {phase} <span className="phaseArrow">→</span> {nextPhase}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default TableHeader;
