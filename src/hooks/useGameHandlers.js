import {
  clamp,
  findAccount,
  findAccountById,
  getContribution,
  getCurrentBet,
} from "../utils/game";
import { formatNumber } from "../utils/format";

const useGameHandlers = ({ state, ui, wagerActions, tableActions }) => {
  const currentBet = getCurrentBet(state.accounts);
  const currentAccount =
    (state.currentAccountId
      ? findAccountById(state.accounts, state.currentAccountId)
      : null) ||
    findAccount(state.accounts, state.walletAddress, state.displayName);
  const userContribution = getContribution(currentAccount);
  const callAmount = Math.max(0, currentBet - userContribution);

  const handleCall = () => {
    if (currentBet <= 0) {
      state.updateFeed("Table", "No active bet to call.");
      return;
    }
    wagerActions.applyRaiseApi({
      label: "Called",
      amount: callAmount,
      stack: state.stack,
      action: "CALL",
    });
  };
  const handleBet = () => {
    if (currentBet > 0) {
      state.updateFeed("Table", "Bet is only allowed when no one has bet yet.");
      return;
    }
    wagerActions.applyRaiseApi({
      label: "Bet",
      amount: state.minPlayerBet,
      stack: state.stack,
      action: "BET",
    });
  };
  const handleRaise = () => {
    if (currentBet <= 0) {
      state.updateFeed("Table", "Raise is only allowed after a bet.");
      return;
    }
    if (state.betAmount < state.minPlayerBet) {
      state.updateFeed("Table", "Raise must be at least the minimum bet.");
      return;
    }
    const totalRaise = callAmount + state.betAmount;
    wagerActions.applyRaiseApi({
      label: "Raised",
      amount: totalRaise,
      stack: state.stack,
      action: "RAISE",
    });
  };
  const handleFold = () => {
    tableActions.handleFold();
  };

  const handleModalCall = () => {
    ui.setActionModal({ open: false, callAmount: 0 });
    state.updateFeed(
      state.displayName,
      `Called ${formatNumber(ui.actionModal.callAmount)}`
    );
  };

  const handleModalRaise = () => {
    const extra = clamp(ui.raiseInput, 1, state.maxBet);
    const total = ui.actionModal.callAmount + extra;
    ui.setActionModal({ open: false, callAmount: total });
    state.updateFeed(state.displayName, `Raised to ${formatNumber(total)}`);
  };

  const handleModalFold = () => {
    ui.setActionModal({ open: false, callAmount: 0 });
    state.updateFeed(state.displayName, "Folded this hand");
  };

  return {
    handleBet,
    handleCall,
    handleFold,
    handleModalCall,
    handleModalFold,
    handleModalRaise,
    handleRaise,
  };
};

export default useGameHandlers;
