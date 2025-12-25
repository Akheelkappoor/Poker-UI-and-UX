import { useGame } from "../../context/GameContext";

const JoinRoomForm = () => {
  const { ui, setupActions, selectedJoinPlayer } = useGame();

  return (
    <>
      <p className="label">Join an existing room.</p>
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
            <div className="player-list">
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
            if (selectedJoinPlayer?.status || selectedJoinPlayer?.address) {
              return <p className="label">Wallet address already on file.</p>;
            }
            return (
              <div className="field-group">
                <label className="label">Wallet address</label>
                <input
                  type="text"
                  value={ui.joinWalletAddress}
                  onChange={(event) => ui.setJoinWalletAddress(event.target.value)}
                  placeholder="Ox..."
                />
              </div>
            );
          })()}
          <button
            className="btn btn-primary"
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
    </>
  );
};

export default JoinRoomForm;
