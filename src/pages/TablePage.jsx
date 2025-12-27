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
import RoundModal from "../components/table/RoundModal";
import ShowdownModal from "../components/table/ShowdownModal";

const TablePage = () => {
  const { state, ui, handlers, tableActions, roundActions, showdownActions } =
    useGame();

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
    walletAddress: state.walletAddress,
  });

  return (
    <div className="app table-page">
      <ToastStack toasts={state.toasts} />
      {ui.roundModal.open ? <RoundModal label={ui.roundModal.label} /> : null}
      {ui.showdownModal.open ? (
        <ShowdownModal
          loading={ui.showdownLoading}
          onClose={showdownActions.closeShowdown}
          onLoss={showdownActions.handleShowdownLoss}
          onWin={showdownActions.handleShowdownWin}
          step={ui.showdownModal.step}
        />
      ) : null}
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
      <div className="table-container">
        <TableHeader
          tableName="MANO Poker"
          currentAccount={currentAccount}
          walletAddress={state.walletAddress}
          playersCount={state.players.length}
          roomId={state.gameIds.roomId}
          isGameStarted={isGameStarted}
        />

        <section className="gridTop">
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
        </section>

        <section className="gridBottom">
          <NextPhasePanel
            phase={state.phase}
            nextPhase={phaseControl.nextPhase}
            readyCount={phaseControl.readyCount}
            totalPlayers={state.accounts.length}
            isReady={phaseControl.isReady}
            allEqual={phaseControl.allEqual}
            notReadyNames={phaseControl.notReadyNames}
            nextLoading={ui.nextLoading}
            isShowdown={state.phase === "Showdown"}
            onReady={roundActions.handleNextReady}
            onShowdown={showdownActions.openShowdown}
          />
          <FeedPanel feed={state.feed} />
          <PlayersPanel players={state.players} accounts={state.accounts} />
        </section>
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
