import {
  clamp,
  findAccount,
  findAccountById,
  getContribution,
  getCurrentBet,
} from "../utils/game";

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
    const amount = state.minPlayerBet;
    if (amount < state.minPlayerBet) {
      state.updateFeed("Table", "Bet must be at least the minimum bet.");
      return;
    }
    wagerActions.applyRaiseApi({
      label: "Bet",
      amount,
      stack: state.stack,
      action: "BET",
    });
  };
  const handleRaise = () => {
    if (currentBet <= 0) {
      state.updateFeed("Table", "Raise is only allowed after a bet.");
      return;
    }
    ui.setRaiseInput(Math.max(state.minPlayerBet, 0));
    ui.setActionModal({ open: true, callAmount });
  };
  const handleFold = () => {
    tableActions.handleFold();
  };

  const handleModalCall = () => {
    if (ui.actionModal.callAmount <= 0) {
      ui.setActionModal({ open: false, callAmount: 0 });
      state.updateFeed("Table", "No active bet to call.");
      return;
    }
    wagerActions.applyRaiseApi({
      label: "Called",
      amount: ui.actionModal.callAmount,
      stack: state.stack,
      action: "CALL",
    });
    ui.setActionModal({ open: false, callAmount: 0 });
  };

  const handleModalRaise = () => {
    if (ui.raiseInput < state.minPlayerBet) {
      state.updateFeed("Table", "Raise must be at least the minimum bet.");
      return;
    }
    const extra = clamp(ui.raiseInput, state.minPlayerBet, state.maxBet);
    const total = ui.actionModal.callAmount + extra;
    wagerActions.applyRaiseApi({
      label: "Raised",
      amount: total,
      stack: state.stack,
      action: "RAISE",
    });
    ui.setActionModal({ open: false, callAmount: total });
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
