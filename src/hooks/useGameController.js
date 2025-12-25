import { useNavigate } from "react-router-dom";
import { useGameState } from "./useGameState";
import useGameUiState from "./useGameUiState";
import useGameSetup from "./useGameSetup";
import useGameLifecycle from "./useGameLifecycle";
import useGameHandlers from "./useGameHandlers";
import useWagerActions from "./useWagerActions";
import useTableActions from "./useTableActions";
import useRoundActions from "./useRoundActions";
import useShowdownActions from "./useShowdownActions";

const useGameController = () => {
  const navigate = useNavigate();
  const state = useGameState();
  const ui = useGameUiState();

  const { setupActions, selectedJoinPlayer } = useGameSetup({
    state,
    ui,
    navigate,
  });

  const wagerActions = useWagerActions({
    accounts: state.accounts,
    callAmount: state.callAmount,
    displayName: state.displayName,
    gameIds: state.gameIds,
    getRoomUrl: ui.urls.getRoomUrl,
    currentAccountId: state.currentAccountId,
    maxPlayerBet: state.maxPlayerBet,
    maxPot: state.maxPot,
    minPlayerBet: state.minPlayerBet,
    raiseUrl: ui.urls.raiseUrl,
    setAccounts: state.setAccounts,
    setBetTracker: state.setBetTracker,
    setCallAmount: state.setCallAmount,
    setGameStatus: state.setGameStatus,
    setTablePlayers: state.setTablePlayers,
    updateFeed: state.updateFeed,
    walletAddress: state.walletAddress,
    walletBalance: state.walletBalance,
  });

  const tableActions = useTableActions({
    accounts: state.accounts,
    displayName: state.displayName,
    gameIds: state.gameIds,
    currentAccountId: state.currentAccountId,
    leaveRoomUrl: ui.urls.leaveRoomUrl,
    moveUrl: ui.urls.moveUrl,
    roundUrl: ui.urls.roundUrl,
    getRoomUrl: ui.urls.getRoomUrl,
    maxPlayerBet: state.maxPlayerBet,
    navigate,
    setAccounts: state.setAccounts,
    setGameIds: state.setGameIds,
    setGameStatus: state.setGameStatus,
    setJoinError: ui.setJoinError,
    setLeaveLoading: ui.setLeaveLoading,
    setFoldLoading: ui.setFoldLoading,
    setNextLoading: ui.setNextLoading,
    setCurrentAccountId: state.setCurrentAccountId,
    setPlayerNameLocked: state.setPlayerNameLocked,
    setSetupComplete: state.setSetupComplete,
    setJoined: state.setJoined,
    setStartGameLoading: ui.setStartGameLoading,
    setStartGameOpen: ui.setStartGameOpen,
    setTablePlayers: state.setTablePlayers,
    setWalletReady: state.setWalletReady,
    startGameUrl: ui.urls.startGameUrl,
    updateFeed: state.updateFeed,
    walletAddress: state.walletAddress,
  });

  const roundActions = useRoundActions({
    accounts: state.accounts,
    currentAccountId: state.currentAccountId,
    displayName: state.displayName,
    gameIds: state.gameIds,
    getRoomUrl: ui.urls.getRoomUrl,
    moveUrl: ui.urls.moveUrl,
    phase: state.phase,
    setAccounts: state.setAccounts,
    setGameStatus: state.setGameStatus,
    setNextLoading: ui.setNextLoading,
    setPhase: state.setPhase,
    setShowdownModal: ui.setShowdownModal,
    setTablePlayers: state.setTablePlayers,
    updateFeed: state.updateFeed,
    walletAddress: state.walletAddress,
  });

  const showdownActions = useShowdownActions({
    accounts: state.accounts,
    currentAccountId: state.currentAccountId,
    displayName: state.displayName,
    failedUrl: ui.urls.failedUrl,
    gameIds: state.gameIds,
    setShowdownLoading: ui.setShowdownLoading,
    setShowdownModal: ui.setShowdownModal,
    updateFeed: state.updateFeed,
    walletAddress: state.walletAddress,
  });

  useGameLifecycle({ state, ui });

  const handlers = useGameHandlers({
    state,
    ui,
    wagerActions,
    tableActions,
  });

  return {
    state,
    ui,
    setupActions,
    selectedJoinPlayer,
    wagerActions,
    tableActions,
    roundActions,
    showdownActions,
    handlers,
  };
};

export default useGameController;
