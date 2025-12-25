import { useCallback } from "react";
import { markFailed } from "../services/api";
import { findAccount, findAccountById } from "../utils/game";

const useShowdownActions = ({
  accounts,
  currentAccountId,
  displayName,
  failedUrl,
  gameIds,
  setShowdownLoading,
  setShowdownModal,
  updateFeed,
  walletAddress,
}) => {
  const openShowdown = useCallback(() => {
    setShowdownModal({ open: true, step: "prompt" });
  }, [setShowdownModal]);

  const closeShowdown = useCallback(() => {
    setShowdownModal({ open: false, step: "prompt" });
  }, [setShowdownModal]);

  const handleShowdownWin = useCallback(() => {
    setShowdownModal({ open: true, step: "win" });
    updateFeed(displayName, "Declared the winner");
    setTimeout(() => {
      setShowdownModal({ open: false, step: "prompt" });
    }, 2200);
  }, [displayName, setShowdownModal, updateFeed]);

  const handleShowdownLoss = useCallback(async () => {
    const user =
      (currentAccountId
        ? findAccountById(accounts, currentAccountId)
        : null) || findAccount(accounts, walletAddress, displayName);
    if (!gameIds.roomId || !user?.id) {
      updateFeed("Table", "Unable to record loss without a player id.");
      return;
    }
    setShowdownLoading(true);
    try {
      const { response, data } = await markFailed(failedUrl, {
        roomId: gameIds.roomId,
        userId: user.id,
      });
      if (!response.ok || data?.success === false) {
        throw new Error(data?.error || "Failed to record loss.");
      }
      setShowdownModal({ open: true, step: "loss" });
      updateFeed(displayName, "Marked as lost");
      setTimeout(() => {
        setShowdownModal({ open: false, step: "prompt" });
      }, 1800);
    } catch (err) {
      updateFeed("Table", err.message || "Unable to record loss.");
    } finally {
      setShowdownLoading(false);
    }
  }, [
    accounts,
    currentAccountId,
    displayName,
    failedUrl,
    gameIds.roomId,
    setShowdownLoading,
    setShowdownModal,
    updateFeed,
    walletAddress,
  ]);

  return {
    closeShowdown,
    handleShowdownLoss,
    handleShowdownWin,
    openShowdown,
  };
};

export default useShowdownActions;
