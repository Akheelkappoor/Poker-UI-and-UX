import { useEffect } from "react";
import { joinRoom, getRoom } from "../services/api";
import { normalizeAccounts } from "../utils/game";
import { buildFeedFromAccounts, mergeFeed } from "../utils/feed";

const useAutoJoin = ({
  accounts,
  autoJoinAttempted,
  autoJoinLoading,
  gameIds,
  joinRoomUrl,
  getRoomUrl,
  setAccounts,
  setAutoJoinAttempted,
  setAutoJoinLoading,
  setGameStatus,
  setJoinError,
  setTablePlayers,
  setWalletReady,
  setFeed,
  setupComplete,
  walletAddress,
  walletReady,
}) => {
  useEffect(() => {
    const tryAutoJoin = async () => {
      if (!gameIds.roomId) {
        if (autoJoinAttempted) {
          setAutoJoinAttempted(false);
        }
        return;
      }
      if (!setupComplete || !walletReady || autoJoinLoading || autoJoinAttempted) {
        return;
      }
      if (accounts.length === 0 || !walletAddress) {
        return;
      }
      const creator = accounts[0];
      if (!creator?.id || creator?.status) {
        return;
      }
      setAutoJoinLoading(true);
      try {
        const { response, data } = await joinRoom(joinRoomUrl, {
          roomId: gameIds.roomId,
          userId: creator.id,
          userAddress: walletAddress,
        });
        if (!response.ok) {
          throw new Error(data?.error || "Failed to join room.");
        }
        if (data?.status) {
          setGameStatus(data.status);
        }
        let normalized = normalizeAccounts(data);
        if (normalized.length === 0) {
          const refresh = await getRoom(getRoomUrl, gameIds.roomId);
          if (refresh.data?.status) {
            setGameStatus(refresh.data.status);
          }
          normalized = normalizeAccounts(refresh.data);
        }
        if (normalized.length > 0) {
          setAccounts(normalized);
          setTablePlayers(
            normalized.map((account) => ({
              name: account.name,
              status: account.status || "Waiting",
            }))
          );
          if (setFeed) {
            const remoteFeed = buildFeedFromAccounts(normalized);
            setFeed((prev) => mergeFeed(prev, remoteFeed));
          }
        }
      } catch (err) {
        const message = err.message || "Unable to join room.";
        setJoinError(message);
        if (message === "Wrong user address") {
          setWalletReady(false);
        }
      } finally {
        setAutoJoinAttempted(true);
        setAutoJoinLoading(false);
      }
    };

    tryAutoJoin();
  }, [
    accounts,
    autoJoinAttempted,
    autoJoinLoading,
    gameIds.roomId,
    joinRoomUrl,
    getRoomUrl,
    setAccounts,
    setAutoJoinAttempted,
    setAutoJoinLoading,
    setGameStatus,
    setJoinError,
    setTablePlayers,
    setWalletReady,
    setFeed,
    setupComplete,
    walletAddress,
    walletReady,
  ]);
};

export default useAutoJoin;
