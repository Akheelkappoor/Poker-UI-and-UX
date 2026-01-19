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
    handleRetryJoin();
  }, [handleRetryJoin]);

  const handleCopyRoomId = useCallback(async () => {
    if (!state.gameIds.roomId) {
      return;
    }
    try {
      await navigator.clipboard.writeText(state.gameIds.roomId);
      state.updateFeed("Room", "Room ID copied.");
    } catch {
      state.updateFeed("Room", "Copy failed. Try again.");
    }
  }, [state.gameIds.roomId, state.updateFeed]);

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
    <div className="app landing-room">
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

      <div className="room-wrap">
        <section className="room-card">
          <div className="room-card-inner">
            <div className="room-layout">
              <div className="room-panel">
                <h2 className="room-title">Room ID</h2>
                <p className="room-sub">
                  Share this code with players. They’ll use it to join your table.
                </p>
                <div className="token-row">
                  <div className="room-token">{state.gameIds.roomId}</div>
                  <button className="btn room-btn" type="button" onClick={handleCopyRoomId}>
                    Copy
                  </button>
                </div>
                <ul className="share-list">
                  <li className="share-item">
                    <span className="share-badge" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 21s-7-4.5-7-11a7 7 0 0 1 14 0c0 6.5-7 11-7 11Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                    <div className="share-text">
                      <strong>Send it once</strong>
                      <span>Drop the code in your group chat. No need to explain more.</span>
                    </div>
                  </li>
                  <li className="share-item">
                    <span className="share-badge" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M4 7h16M4 12h16M4 17h10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <div className="share-text">
                      <strong>Keep names consistent</strong>
                      <span>Players should join with the same names you used to create the room.</span>
                    </div>
                  </li>
                </ul>
                <p className="room-note">
                  If someone can’t join, confirm the code matches exactly.
                </p>
              </div>
              <div className="room-panel">
                <h2 className="room-title">Wallet</h2>
                <p className="room-sub">Set the wallet address you’ll use for settlements.</p>
                <div className="field-group">
                  <label className="label">Your wallet address</label>
                  <input
                    type="text"
                    value={state.walletAddress}
                    onChange={(event) => state.setWalletAddress(event.target.value)}
                    placeholder="0x..."
                  />
                </div>
                <div className="room-actions">
                  <button
                    className="btn btn-primary"
                    onClick={handleContinue}
                    disabled={!state.walletAddress.trim() || ui.joinLoading}
                  >
                    {ui.joinLoading ? "Retrying..." : ui.joinError ? "Retry" : "Continue"}
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
                {ui.joinError ? <div className="error">{ui.joinError}</div> : null}
                <p className="room-note">
                  Don’t continue with an invalid address. Double-check before proceeding.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoomPage;
