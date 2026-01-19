import { useCallback } from "react";
import { moveNext } from "../services/api";
import {
  findAccount,
  findAccountById,
} from "../utils/game";
import syncRoom from "../utils/roomSync";

const useRoundActions = ({
  accounts,
  currentAccountId,
  displayName,
  gameIds,
  getRoomUrl,
  moveUrl,
  phase,
  setAccounts,
  setGameStatus,
  setNextLoading,
  setPhase,
  setShowdownModal,
  setTablePlayers,
  updateFeed,
  walletAddress,
}) => {
  const handleNextReady = useCallback(async () => {
    const user =
      (currentAccountId
        ? findAccountById(accounts, currentAccountId)
        : null) || findAccount(accounts, walletAddress, displayName);
    if (!gameIds.roomId || !user?.id) {
      updateFeed("Table", "Unable to ready without a player id.");
      return;
    }
    setNextLoading(true);
    try {
      const { response, data } = await moveNext(moveUrl, {
        roomId: gameIds.roomId,
        userId: user.id,
      });
      if (!response.ok || data?.success === false) {
        throw new Error(data?.error || "Ready failed.");
      }
      const updatedPhase = await syncRoom({
        roomId: gameIds.roomId,
        getRoomUrl,
        setGameStatus,
        setPhase,
        setAccounts,
        setTablePlayers,
      });
      if ((updatedPhase || phase) === "Showdown") {
        setShowdownModal({ open: true, step: "prompt" });
      }
      updateFeed(displayName, "Ready for next round");
    } catch (err) {
      updateFeed("Table", err.message || "Ready failed.");
    } finally {
      setNextLoading(false);
    }
  }, [
    accounts,
    currentAccountId,
    displayName,
    gameIds.roomId,
    getRoomUrl,
    moveUrl,
    phase,
    setAccounts,
    setGameStatus,
    setNextLoading,
    setPhase,
    setShowdownModal,
    setTablePlayers,
    updateFeed,
    walletAddress,
  ]);

  return { handleNextReady };
};

export default useRoundActions;
