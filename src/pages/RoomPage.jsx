import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ToastStack from "../components/ToastStack";
import { useGame } from "../context/GameContext";
import { STORAGE_KEY } from "../utils/gameStateStorage";
import { joinRoom, rejoinRoom } from "../services/api";

const RoomPage = () => {
  const { state, ui } = useGame();
  const navigate = useNavigate();

  const handleRetryJoin = useCallback(async () => {
    if (!state.gameIds.roomId) {
      ui.setJoinError("Room id is required.");
      return;
    }
    if (!state.currentAccountId) {
      ui.setJoinError("Select your name again.");
      return;
    }
    if (!state.walletAddress.trim()) {
      ui.setJoinError("Wallet address is required.");
      return;
    }
    ui.setJoinError("");
    ui.setJoinLoading(true);
    try {
      const payload = {
        roomId: state.gameIds.roomId,
        userId: state.currentAccountId,
      };
      const response = await joinRoom(ui.urls.joinRoomUrl, {
        ...payload,
        userAddress: state.walletAddress.trim(),
      });
      let data = response.data;
      if (!response.response.ok) {
        throw new Error(data?.error || "Failed to join room.");
      }
      if (data?.error === "Played Already Joined") {
        const retry = await rejoinRoom(ui.urls.alreadyJoinedUrl, payload);
        data = retry.data;
        if (!retry.response.ok) {
          throw new Error(data?.error || "Unable to rejoin.");
        }
      }
      if (data?.error) {
        throw new Error(data.error);
      }
      if (data?.status) {
        state.setGameStatus(data.status);
      }
      state.setWalletReady(true);
    } catch (err) {
      ui.setJoinError(err.message || "Unable to join room.");
    } finally {
      ui.setJoinLoading(false);
    }
  }, [
    state.currentAccountId,
    state.gameIds.roomId,
    state.setGameStatus,
    state.setWalletReady,
    state.walletAddress,
    ui.setJoinError,
    ui.setJoinLoading,
    ui.urls.alreadyJoinedUrl,
    ui.urls.joinRoomUrl,
  ]);

  const handleContinue = useCallback(() => {
    if (ui.joinError) {
      handleRetryJoin();
      return;
    }
    state.setWalletReady(true);
  }, [handleRetryJoin, state.setWalletReady, ui.joinError]);

  useEffect(() => {
    if (!state.setupComplete && !ui.joinError) {
      navigate("/", { replace: true });
    } else if (state.walletReady) {
      navigate("/table", { replace: true });
    }
  }, [state.setupComplete, state.walletReady, ui.joinError, navigate]);

  if (!state.setupComplete && !ui.joinError) {
    return null;
  }

  return (
    <div className="app">
      <ToastStack toasts={state.toasts} />
      <div className="top-bar">
        <div className="brand">
          <h1>
            <span className="brand-white">MANO</span>
            <span className="brand-gold">Money</span>
          </h1>
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
          onClick={handleContinue}
          disabled={!state.walletAddress.trim() || ui.joinLoading}
        >
          {ui.joinLoading ? "Retrying..." : ui.joinError ? "Retry" : "Continue"}
        </button>
        {ui.joinError ? <div className="error">{ui.joinError}</div> : null}
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
