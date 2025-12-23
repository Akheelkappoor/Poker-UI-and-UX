import { useEffect } from "react";
import useAutoJoin from "./useAutoJoin";
import useRoomRefresh from "./useRoomRefresh";

const useGameLifecycle = ({ state, ui }) => {
  useAutoJoin({
    accounts: state.accounts,
    autoJoinLoading: ui.autoJoinLoading,
    gameIds: state.gameIds,
    joinRoomUrl: ui.urls.joinRoomUrl,
    getRoomUrl: ui.urls.getRoomUrl,
    setAccounts: state.setAccounts,
    setAutoJoinLoading: ui.setAutoJoinLoading,
    setGameStatus: state.setGameStatus,
    setJoinError: ui.setJoinError,
    setFeed: state.setFeed,
    setTablePlayers: state.setTablePlayers,
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
    getRoomUrl: ui.urls.getRoomUrl,
  });

  useEffect(() => {
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
    state.buyIn,
    state.displayName,
    state.setJoined,
    state.setCallAmount,
    state.setBetAmount,
    state.updateFeed,
  ]);
};

export default useGameLifecycle;
