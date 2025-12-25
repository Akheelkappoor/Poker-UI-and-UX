import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToastStack from "../components/ToastStack";
import { useGame } from "../context/GameContext";
import CreateRoomForm from "../components/setup/CreateRoomForm";
import JoinRoomForm from "../components/setup/JoinRoomForm";

const CreateJoinPage = () => {
  const { state, ui } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.gameIds.roomId && state.walletReady) {
      navigate("/table", { replace: true });
      return;
    }
    if (state.gameIds.roomId && !state.walletReady) {
      navigate("/room", { replace: true });
    }
  }, [state.gameIds.roomId, state.walletReady, navigate]);

  return (
    <div className="app">
      <ToastStack toasts={state.toasts} />
      <div className="top-bar">
        <div className="brand">
          <h1>
            <span className="brand-white">MANO</span>
            <span className="brand-gold">Money</span>
          </h1>
          <p>Join or create poker rooms to play with friends.</p>
        </div>
      </div>

      <div className="panel join-card">
        <h2>Enter the Game</h2>
        <p className="label">Choose how you want to enter.</p>
        <div className="mode-toggle">
          <button
            className={`btn ${ui.setupMode === "create" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => ui.setSetupMode("create")}
          >
            Create Room
          </button>
          <button
            className={`btn ${ui.setupMode === "join" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => ui.setSetupMode("join")}
          >
            Join Room
          </button>
        </div>
        {ui.setupMode === "create" ? <CreateRoomForm /> : null}
        {ui.setupMode === "join" ? <JoinRoomForm /> : null}
      </div>
    </div>
  );
};

export default CreateJoinPage;
