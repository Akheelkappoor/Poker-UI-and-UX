import { useMemo } from "react";
import {
  findAccount,
  findAccountById,
  getContribution,
  getCurrentBet,
} from "../utils/game";

const useTableView = ({
  accounts,
  betTracker,
  currentAccountId,
  displayName,
  gameStatus,
  maxPlayerBet,
  walletAddress,
}) => {
  const currentAccount = useMemo(() => {
    return (
      (currentAccountId
        ? findAccountById(accounts, currentAccountId)
        : null) || findAccount(accounts, walletAddress, displayName) ||
      accounts[0] ||
      null
    );
  }, [accounts, walletAddress, displayName, currentAccountId]);

  const normalizedStatus = String(gameStatus || "").trim().toUpperCase();
  const isGameStarted =
    normalizedStatus === "STARTED" ||
    normalizedStatus === "PLAYING" ||
    normalizedStatus === "LIVE";
  const hasAllPlayersBet =
    accounts.length > 0 &&
    accounts.every((account) => {
      const hasServerBet = getContribution(account) > 0;
      const hasLocalBet = account.id ? Boolean(betTracker[account.id]) : false;
      return hasServerBet || hasLocalBet;
    });

  const lowBalancePlayers = useMemo(
    () =>
      accounts
        .map((player) => {
          const balance = Number(player.walletBalance ?? player.amount ?? 0) || 0;
          const needed = Math.max(0, maxPlayerBet - balance);
          return {
            name: player.name,
            balance,
            needed,
          };
        })
        .filter((player) => player.needed > 0),
    [accounts, maxPlayerBet]
  );

  const currentBet = getCurrentBet(accounts);
  const hasActiveBet = currentBet > 0 || hasAllPlayersBet;

  return {
    currentAccount,
    currentBet,
    hasActiveBet,
    isGameStarted,
    lowBalancePlayers,
  };
};

export default useTableView;
