import { useCallback } from "react";
import { getRoom, raise } from "../services/api";
import {
  clamp,
  findAccount,
  findAccountById,
  getRoomLimits,
  normalizeAccounts,
  getRoomPotLimit,
} from "../utils/game";
import { formatNumber } from "../utils/format";

const useWagerActions = ({
  accounts,
  callAmount,
  displayName,
  gameIds,
  getRoomUrl,
  currentAccountId,
  maxPlayerBet,
  maxPot,
  minPlayerBet,
  raiseUrl,
  setAccounts,
  setBetTracker,
  setCallAmount,
  setGameStatus,
  setTablePlayers,
  setMinPlayerBet,
  setMaxPlayerBet,
  setMaxPot,
  updateFeed,
  walletAddress,
  walletBalance,
}) => {
  const validateWager = useCallback(
    (amount) => {
      if (amount > walletBalance) {
        updateFeed("Table", "Wallet balance too low for that amount.");
        return false;
      }
      if (amount < minPlayerBet) {
        updateFeed("Table", "That is below the admin minimum bet.");
        return false;
      }
      if (amount > maxPlayerBet) {
        updateFeed("Table", "That exceeds the admin max bet per player.");
        return false;
      }
      if (amount + (Number(callAmount) || 0) > maxPot) {
        updateFeed("Table", "That would exceed the admin max pot size.");
        return false;
      }
      return true;
    },
    [walletBalance, minPlayerBet, maxPlayerBet, maxPot, callAmount, updateFeed]
  );

  const getUserId = useCallback(() => {
    const user =
      (currentAccountId
        ? findAccountById(accounts, currentAccountId)
        : null) || findAccount(accounts, walletAddress, displayName);
    return user?.id || "";
  }, [accounts, walletAddress, displayName, currentAccountId]);

  const refreshRoom = useCallback(
    async (roomId) => {
      const refresh = await getRoom(getRoomUrl, roomId);
      if (!refresh.response.ok) {
        return;
      }
      if (refresh.data?.status) {
        setGameStatus(refresh.data.status);
      }
      const limits = getRoomLimits(refresh.data);
      if (limits) {
        if (setMinPlayerBet) {
          setMinPlayerBet(limits.min);
        }
        if (setMaxPlayerBet) {
          setMaxPlayerBet(limits.max);
        }
      }
      if (setMaxPot) {
        const potLimit = getRoomPotLimit(refresh.data);
        if (potLimit !== null) {
          setMaxPot(potLimit);
        }
      }
      const normalized = normalizeAccounts(refresh.data);
      if (normalized.length > 0) {
        setAccounts(normalized);
        setTablePlayers(
          normalized.map((player) => ({
            name: player.name,
            status: player.status || "Waiting",
          }))
        );
      }
    },
    [
      getRoomUrl,
      setAccounts,
      setGameStatus,
      setTablePlayers,
      setMinPlayerBet,
      setMaxPlayerBet,
      setMaxPot,
    ]
  );

  const applyRaiseApi = useCallback(
    async ({ label, amount, stack, action }) => {
      if (amount <= 0 || !gameIds.roomId) {
        return;
      }
      if (amount < minPlayerBet) {
        updateFeed("Table", "Raise must be at least the minimum bet.");
        return;
      }
      const userId = getUserId();
      if (!userId) {
        updateFeed("Table", "Player id missing.");
        return;
      }
      const wager = clamp(amount, 1, stack);
      if (!validateWager(wager)) {
        updateFeed("Table", "Action rejected by limits");
        return;
      }
      const { response, data } = await raise(raiseUrl, {
        roomId: gameIds.roomId,
        userId,
        amount: wager,
        action,
      });
      if (!response.ok || data?.success === false) {
        updateFeed("Table", data?.error || "Raise failed.");
        return;
      }
      if (label === "Raised" || label === "Bet") {
        setCallAmount(wager);
      }
      if (label === "Bet") {
        setBetTracker((prev) => ({ ...prev, [userId]: true }));
      }
      updateFeed(displayName, `${label} ${formatNumber(wager)}`);
      await refreshRoom(gameIds.roomId);
    },
    [
      gameIds.roomId,
      getUserId,
      minPlayerBet,
      raiseUrl,
      refreshRoom,
      setBetTracker,
      setCallAmount,
      updateFeed,
      displayName,
      validateWager,
    ]
  );

  return {
    applyRaiseApi,
    validateWager,
  };
};

export default useWagerActions;
