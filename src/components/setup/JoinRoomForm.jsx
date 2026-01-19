import { useGame } from "../../context/GameContext";

const JoinRoomForm = () => {
  const { ui, setupActions, selectedJoinPlayer } = useGame();

  return (
    <>
      <div className="enter-layout">
        <div className="enter-panel">
          <p className="panel-title">Join Room</p>
          <p className="panel-sub">Enter the room code from the host.</p>
          <div className="field-group">
            <label className="label">Room id</label>
            <input
              type="text"
              value={ui.joinRoomId}
              onChange={(event) => ui.setJoinRoomId(event.target.value)}
              placeholder="Enter room id"
            />
          </div>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => setupActions.handleRoomLookup(ui.joinRoomId)}
            disabled={ui.roomLookupLoading}
          >
            {ui.roomLookupLoading ? "Loading room..." : "Load room"}
          </button>
          {ui.roomLookupError ? <div className="error">{ui.roomLookupError}</div> : null}
          {ui.joinError ? <div className="error">{ui.joinError}</div> : null}
          {ui.joinRoomPlayers.length > 0 ? (
            <div className="join-room">
                <div className="field-group">
                  <label className="label">Choose your name</label>
                  <div>
                    {ui.joinRoomPlayers.map((player) => (
                      <label className="player-select" key={`join-${player.id}`}>
                        <input
                          type="radio"
                        name="join-player"
                        value={player.id}
                        checked={String(ui.joinSelectedId) === String(player.id)}
                        onChange={(event) => ui.setJoinSelectedId(event.target.value)}
                      />
                      <span>{player.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              {(() => {
                const hasWalletOnFile = Boolean(
                  selectedJoinPlayer?.userAddress || selectedJoinPlayer?.address
                );
                if (hasWalletOnFile) {
                  return <p className="label">Wallet address already on file.</p>;
                }
                return (
                  <div className="field-group">
                    <label className="label">Wallet address</label>
                    <input
                      type="text"
                      value={ui.joinWalletAddress}
                      onChange={(event) => ui.setJoinWalletAddress(event.target.value)}
                      placeholder="0x..."
                    />
                  </div>
                );
              })()}
              <button
                className="btn btn-primary"
                type="button"
                onClick={() =>
                  setupActions.handleJoinRoom({
                    roomId: ui.joinRoomId,
                    selected: selectedJoinPlayer,
                    joinWalletAddress: ui.joinWalletAddress,
                    joinRoomPlayers: ui.joinRoomPlayers,
                  })
                }
                disabled={ui.joinLoading}
              >
                {ui.joinLoading ? "Joining..." : "Join Room"}
              </button>
            </div>
          ) : null}
        </div>
        <div className="enter-panel enter-panel-muted">
          <p className="panel-title">What you’ll see next</p>
          <p className="panel-sub">
            Seat list, buy-in limits, and the host’s rules. If something is wrong,
            don’t join—fix it first.
          </p>
        </div>
      </div>
    </>
  );
};

export default JoinRoomForm;
