import { Navigate } from "react-router-dom";
import ToastStack from "../components/ToastStack";
import { useGame } from "../context/GameContext";
import { getContribution } from "../utils/game";
import useTableView from "../hooks/useTableView";
import usePhaseControl from "../hooks/usePhaseControl";
import ActionModal from "../components/table/ActionModal";
import TableHeader from "../components/table/TableHeader";
import TablePotPanel from "../components/table/TablePotPanel";
import StackPanel from "../components/table/StackPanel";
import ActionPanel from "../components/table/ActionPanel";
import StartGamePanel from "../components/table/StartGamePanel";
import NextPhasePanel from "../components/table/NextPhasePanel";
import FeedPanel from "../components/table/FeedPanel";
import PlayersPanel from "../components/table/PlayersPanel";
import TableFooter from "../components/table/TableFooter";
import StartGameModal from "../components/table/StartGameModal";

const TablePage = () => {
  const { state, ui, handlers, tableActions } = useGame();

  if (!state.setupComplete || !state.walletReady) {
    return <Navigate to="/" replace />;
  }

  const {
    currentAccount,
    hasActiveBet,
    isGameStarted,
    lowBalancePlayers,
  } = useTableView({
    accounts: state.accounts,
    betTracker: state.betTracker,
    currentAccountId: state.currentAccountId,
    displayName: state.displayName,
    gameStatus: state.gameStatus,
    maxPlayerBet: state.maxPlayerBet,
    pot: state.pot,
    walletAddress: state.walletAddress,
  });

  const phaseControl = usePhaseControl({
    accounts: state.accounts,
    currentAccountId: state.currentAccountId,
    displayName: state.displayName,
    phase: state.phase,
    readyPlayers: state.readyPlayers,
    setPhase: state.setPhase,
    setReadyPlayers: state.setReadyPlayers,
    updateFeed: state.updateFeed,
    walletAddress: state.walletAddress,
  });

  return (
    <div className="app">
      <ToastStack toasts={state.toasts} />
      {ui.actionModal.open ? (
        <ActionModal
          callAmount={ui.actionModal.callAmount}
          isGameStarted={isGameStarted}
          maxBet={state.maxBet}
          raiseInput={ui.raiseInput}
          setRaiseInput={ui.setRaiseInput}
          onCall={handlers.handleModalCall}
          onFold={handlers.handleModalFold}
          onRaise={handlers.handleModalRaise}
        />
      ) : null}
      <TableHeader
        tableName="MANO Poker"
        currentAccount={currentAccount}
        walletAddress={state.walletAddress}
        playersCount={state.players.length}
        roomId={state.gameIds.roomId}
        isGameStarted={isGameStarted}
      />

      <div className="main-grid">
        <TablePotPanel pot={state.pot} />
        <StackPanel
          stack={state.stack}
          walletBalance={state.walletBalance}
          totalBet={getContribution(currentAccount)}
          minPlayerBet={state.minPlayerBet}
          maxPlayerBet={state.maxPlayerBet}
        />
        <ActionPanel
          betAmount={state.betAmount}
          chips={[5, 10, 25, 50, 100]}
          foldLoading={ui.foldLoading}
          hasActiveBet={hasActiveBet}
          handleBet={handlers.handleBet}
          handleCall={handlers.handleCall}
          handleFold={handlers.handleFold}
          handleRaise={handlers.handleRaise}
          isGameStarted={isGameStarted}
          maxBet={state.maxBet}
          setBetAmount={state.setBetAmount}
        />
        <StartGamePanel
          isGameStarted={isGameStarted}
          startGameLoading={ui.startGameLoading}
          handleStartGame={tableActions.handleStartGame}
        />
        <NextPhasePanel
          phase={state.phase}
          nextPhase={phaseControl.nextPhase}
          readyCount={phaseControl.readyCount}
          totalPlayers={state.accounts.length}
          isReady={phaseControl.isReady}
          allEqual={phaseControl.allEqual}
          notReadyNames={phaseControl.notReadyNames}
          onReady={phaseControl.handleReady}
        />
        <FeedPanel feed={state.feed} />
        <PlayersPanel players={state.players} accounts={state.accounts} />
      </div>

      <TableFooter
        handleLeave={tableActions.handleLeave}
        leaveLoading={ui.leaveLoading}
      />

      {ui.startGameOpen ? (
        <StartGameModal
          lowBalancePlayers={lowBalancePlayers}
          onClose={() => ui.setStartGameOpen(false)}
        />
      ) : null}
    </div>
  );
};

export default TablePage;
