import { useEffect } from "react";
import useAutoJoin from "./useAutoJoin";
import useRoomRefresh from "./useRoomRefresh";
import useRoundAnnouncement from "./useRoundAnnouncement";
import useRoomSocket from "./useRoomSocket";

const useGameLifecycle = ({ state, ui }) => {
  useAutoJoin({
    accounts: state.accounts,
    autoJoinAttempted: ui.autoJoinAttempted,
    autoJoinLoading: ui.autoJoinLoading,
    gameIds: state.gameIds,
    joinRoomUrl: ui.urls.joinRoomUrl,
    getRoomUrl: ui.urls.getRoomUrl,
    setAccounts: state.setAccounts,
    setAutoJoinAttempted: ui.setAutoJoinAttempted,
    setAutoJoinLoading: ui.setAutoJoinLoading,
    setGameStatus: state.setGameStatus,
    setJoinError: ui.setJoinError,
    setFeed: state.setFeed,
    setTablePlayers: state.setTablePlayers,
    setWalletReady: state.setWalletReady,
    setupComplete: state.setupComplete,
    walletAddress: state.walletAddress,
    walletReady: state.walletReady,
  });

  useRoomRefresh({
    roomId: state.gameIds.roomId,
    setAccounts: state.setAccounts,
    setTablePlayers: state.setTablePlayers,
    setGameStatus: state.setGameStatus,
    setFeed: state.setFeed,
    setWalletReady: state.setWalletReady,
    currentAccountId: state.currentAccountId,
    setPot: state.setPot,
    setPhase: state.setPhase,
    getRoomUrl: ui.urls.getRoomUrl,
  });

  useRoomSocket({
    roomId: state.gameIds.roomId,
    socketBaseUrl: ui.urls.socketUrl,
    getRoomUrl: ui.urls.getRoomUrl,
    setGameStatus: state.setGameStatus,
    setPhase: state.setPhase,
    setAccounts: state.setAccounts,
    setTablePlayers: state.setTablePlayers,
    setPot: state.setPot,
    setWalletReady: state.setWalletReady,
    currentAccountId: state.currentAccountId,
    setFeed: state.setFeed,
  });

  useRoundAnnouncement(state.phase, ui.setRoundModal);

  useEffect(() => {
    if (state.walletPending && !state.walletReady) {
      state.setWalletReady(true);
      state.setWalletPending(false);
    }
    if (state.setupComplete && state.walletReady && !state.joined) {
      state.setJoined(true);
      state.setCallAmount(10);
      state.setBetAmount(Math.min(20, state.buyIn));
      state.updateFeed(state.displayName, "Joined the table");
    }
  }, [
    state.setupComplete,
    state.walletReady,
    state.joined,
    state.walletPending,
    state.buyIn,
    state.displayName,
    state.setJoined,
    state.setCallAmount,
    state.setBetAmount,
    state.updateFeed,
    state.setWalletPending,
    state.setWalletReady,
  ]);
};

export default useGameLifecycle;
