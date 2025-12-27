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
    <div className="app landing-home">
      <ToastStack toasts={state.toasts} />
      <div className="top-bar">
        <div className="brand">
          <h1>
            <span className="brand-white">MANO</span>
            <span className="brand-gold">Money</span>
          </h1>
          <p>Join or create poker rooms to play with friends.</p>
        </div>
        <nav className="top-nav" aria-label="Primary">
          <button type="button" className="nav-chip">
            How it works
          </button>
          <button type="button" className="nav-chip">
            House rules
          </button>
          <button type="button" className="nav-chip">
            Support
          </button>
        </nav>
      </div>

      <div className="landing-wrap">
        <div className="panel join-card enter-card">
          <div className="enter-header">
            <h2>Enter the Game</h2>
            <p className="enter-subtitle">Choose how you want to enter.</p>
          </div>
          <div className="enter-tabs" role="tablist" aria-label="Entry mode">
            <button
              className="enter-tab"
              role="tab"
              aria-selected={ui.setupMode === "create"}
              type="button"
              onClick={() => ui.setSetupMode("create")}
            >
              Create Room
            </button>
            <button
              className="enter-tab"
              role="tab"
              aria-selected={ui.setupMode === "join"}
              type="button"
              onClick={() => ui.setSetupMode("join")}
            >
              Join Room
            </button>
          </div>
          {ui.setupMode === "create" ? <CreateRoomForm /> : null}
          {ui.setupMode === "join" ? <JoinRoomForm /> : null}
        </div>
      </div>
    </div>
  );
};

export default CreateJoinPage;
