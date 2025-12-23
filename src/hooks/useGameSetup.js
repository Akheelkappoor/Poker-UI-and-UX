import { useMemo } from "react";
import useCreateRoomActions from "./useCreateRoomActions";
import useJoinRoomActions from "./useJoinRoomActions";

const useGameSetup = ({ state, ui, navigate }) => {
  const createActions = useCreateRoomActions({
    createRoomUrl: ui.urls.createRoomUrl,
    navigate,
    setAccounts: state.setAccounts,
    setGameIds: state.setGameIds,
    setMaxPlayerBet: state.setMaxPlayerBet,
    setMinPlayerBet: state.setMinPlayerBet,
    setCurrentAccountId: state.setCurrentAccountId,
    setPlayerName: state.setPlayerName,
    setPlayerNameLocked: state.setPlayerNameLocked,
    setSetupComplete: state.setSetupComplete,
    setSetupError: ui.setSetupError,
    setSetupLoading: ui.setSetupLoading,
    setSetupMode: ui.setSetupMode,
    setTablePlayers: state.setTablePlayers,
    setWalletReady: state.setWalletReady,
  });

  const joinActions = useJoinRoomActions({
    alreadyJoinedUrl: ui.urls.alreadyJoinedUrl,
    getRoomUrl: ui.urls.getRoomUrl,
    joinRoomUrl: ui.urls.joinRoomUrl,
    navigate,
    setAccounts: state.setAccounts,
    setGameIds: state.setGameIds,
    setGameStatus: state.setGameStatus,
    setJoinError: ui.setJoinError,
    setJoinLoading: ui.setJoinLoading,
    setJoinRoomPlayers: ui.setJoinRoomPlayers,
    setJoinSelectedId: ui.setJoinSelectedId,
    setPlayerName: state.setPlayerName,
    setPlayerNameLocked: state.setPlayerNameLocked,
    setCurrentAccountId: state.setCurrentAccountId,
    setSetupComplete: state.setSetupComplete,
    setSetupMode: ui.setSetupMode,
    setTablePlayers: state.setTablePlayers,
    setWalletAddress: state.setWalletAddress,
    setWalletReady: state.setWalletReady,
    setRoomLookupError: ui.setRoomLookupError,
    setRoomLookupLoading: ui.setRoomLookupLoading,
  });

  const selectedJoinPlayer = useMemo(
    () =>
      ui.joinRoomPlayers.find(
        (player) => String(player.id) === String(ui.joinSelectedId)
      ),
    [ui.joinRoomPlayers, ui.joinSelectedId]
  );

  return {
    setupActions: { ...createActions, ...joinActions },
    selectedJoinPlayer,
  };
};

export default useGameSetup;
