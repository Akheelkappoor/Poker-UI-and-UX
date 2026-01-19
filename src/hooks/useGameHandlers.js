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
  const handleAllIn = () => {
    const amount = Math.max(0, state.stack);
    if (amount <= 0) {
      state.updateFeed("Table", "No chips available to go all-in.");
      return;
    }
    if (currentBet > 0) {
      const action = amount <= callAmount ? "CALL" : "RAISE";
      const label = amount <= callAmount ? "Called" : "Raised";
      wagerActions.applyRaiseApi({
        label,
        amount,
        stack: state.stack,
        action,
      });
      return;
    }
    wagerActions.applyRaiseApi({
      label: "Bet",
      amount,
      stack: state.stack,
      action: "BET",
    });
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
    tableActions.handleFold();
    ui.setActionModal({ open: false, callAmount: 0 });
  };

  const maxRaiseExtra = Math.max(0, state.stack - ui.actionModal.callAmount);

  const handleMinRaise = () => {
    ui.setRaiseInput(Math.max(state.minPlayerBet, 0));
  };

  const handleMaxRaise = () => {
    ui.setRaiseInput(maxRaiseExtra);
  };

  return {
    handleBet,
    handleCall,
    handleFold,
    handleAllIn,
    handleModalCall,
    handleModalFold,
    handleModalRaise,
    handleMaxRaise,
    handleMinRaise,
    handleRaise,
    maxRaiseExtra,
  };
};

export default useGameHandlers;
