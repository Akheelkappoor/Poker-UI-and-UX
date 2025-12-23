import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToastStack from "../components/ToastStack";
import { useGame } from "../context/GameContext";
import { STORAGE_KEY } from "../utils/gameStateStorage";

const RoomPage = () => {
  const { state } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.setupComplete) {
      navigate("/", { replace: true });
    } else if (state.walletReady) {
      navigate("/table", { replace: true });
    }
  }, [state.setupComplete, state.walletReady, navigate]);

  if (!state.setupComplete) {
    return null;
  }

  return (
    <div className="app">
      <ToastStack toasts={state.toasts} />
      <div className="top-bar">
        <div className="brand">
          <h1>Room Created</h1>
          <p>Share the room id and set your wallet.</p>
        </div>
        <div className="status">
          <span className="status-pill">Room</span>
          <span className="label">ID {state.gameIds.roomId}</span>
        </div>
      </div>

      <div className="panel join-card">
        <h2>Room ID</h2>
        <p className="label">Share this room id with players.</p>
        <div className="room-id">{state.gameIds.roomId}</div>
        <div className="field-group">
          <label className="label">Your wallet address</label>
          <input
            type="text"
            value={state.walletAddress}
            onChange={(event) => state.setWalletAddress(event.target.value)}
            placeholder="Ox..."
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => state.setWalletReady(true)}
          disabled={!state.walletAddress.trim()}
        >
          Continue
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            state.setSetupComplete(false);
            state.setWalletReady(false);
            state.setCurrentAccountId("");
            state.setAccounts([]);
            state.setTablePlayers([]);
            state.setGameIds({ roomId: "" });
            navigate("/", { replace: true });
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default RoomPage;
