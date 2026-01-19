import { useCallback } from "react";
import { leaveRoom, startGame } from "../services/api";
import { STORAGE_KEY } from "../utils/gameStateStorage";
import { findAccount, findAccountById, normalizeAccounts } from "../utils/game";

const useTableActions = ({
  accounts,
  displayName,
  gameIds,
  currentAccountId,
  leaveRoomUrl,
  maxPlayerBet,
  navigate,
  setAccounts,
  setGameIds,
  setGameStatus,
  setJoinError,
  setLeaveLoading,
  setFoldLoading,
  setJoined,
  setCurrentAccountId,
  setSetupComplete,
  setStartGameLoading,
  setStartGameOpen,
  setTablePlayers,
  setWalletReady,
  startGameUrl,
  updateFeed,
  walletAddress,
}) => {
  const handleLeave = useCallback(async () => {
    setLeaveLoading(true);
    try {
      const user =
        (currentAccountId
          ? findAccountById(accounts, currentAccountId)
          : null) || findAccount(accounts, walletAddress, displayName);
      if (gameIds.roomId && user?.id) {
        await leaveRoom(leaveRoomUrl, {
          roomId: gameIds.roomId,
          userId: user.id,
        });
      }
    } catch {
      updateFeed("Table", "Unable to leave room.");
    } finally {
      localStorage.removeItem(STORAGE_KEY);
      setSetupComplete(false);
      setWalletReady(false);
      setCurrentAccountId("");
      setJoined(false);
      setAccounts([]);
      setTablePlayers([]);
      setGameIds({ roomId: "" });
      navigate("/", { replace: true });
      setLeaveLoading(false);
    }
  }, [
    accounts,
    walletAddress,
    displayName,
    gameIds.roomId,
    currentAccountId,
    leaveRoomUrl,
    navigate,
    setLeaveLoading,
    setCurrentAccountId,
    setJoined,
    setSetupComplete,
    setWalletReady,
    setAccounts,
    setTablePlayers,
    setGameIds,
    updateFeed,
  ]);

  const handleFold = useCallback(async () => {
    const user =
      (currentAccountId
        ? findAccountById(accounts, currentAccountId)
        : null) || findAccount(accounts, walletAddress, displayName);
    if (!gameIds.roomId || !user?.id) {
      updateFeed("Table", "Unable to fold without a player id.");
      return;
    }
    setFoldLoading(true);
    try {
      const { response, data } = await leaveRoom(leaveRoomUrl, {
        roomId: gameIds.roomId,
        userId: user.id,
      });
      if (!response.ok) {
        throw new Error(data?.error || "Fold failed.");
      }
      updateFeed(displayName, "Folded");
    } catch (err) {
      updateFeed("Table", err.message || "Fold failed.");
    } finally {
      setFoldLoading(false);
    }
  }, [
    accounts,
    displayName,
    gameIds.roomId,
    currentAccountId,
    leaveRoomUrl,
    updateFeed,
    walletAddress,
    setFoldLoading,
  ]);

  const handleStartGame = useCallback(async () => {
    if (!gameIds.roomId) {
      updateFeed("Table", "Room ID missing. Rejoin the room.");
      return;
    }
    setStartGameLoading(true);
    try {
      const { response, data } = await startGame(startGameUrl, gameIds.roomId);
      if (!response.ok) {
        throw new Error(data?.error || "Failed to start game.");
      }
      let normalized = [];
      if (Array.isArray(data.players)) {
        normalized = normalizeAccounts({ players: data.players });
        setAccounts(normalized);
        setTablePlayers(
          normalized.map((player) => ({
            name: player.name,
            status: player.status || "Waiting",
          }))
        );
      }
      const needsTopUp = normalized.some((player) => {
        const balance = Number(player.walletBalance ?? player.amount ?? 0) || 0;
        return balance < maxPlayerBet;
      });
      if (needsTopUp) {
        setStartGameOpen(true);
        return;
      }
      if (data?.status) {
        setGameStatus(data.status);
      }
      setStartGameOpen(false);
    } catch (err) {
      setJoinError(err.message || "Unable to start game.");
    } finally {
      setStartGameLoading(false);
    }
  }, [
    gameIds.roomId,
    maxPlayerBet,
    setAccounts,
    setGameStatus,
    setJoinError,
    setStartGameLoading,
    setStartGameOpen,
    setTablePlayers,
    startGameUrl,
    updateFeed,
  ]);

  return {
    handleFold,
    handleLeave,
    handleStartGame,
  };
};

export default useTableActions;
