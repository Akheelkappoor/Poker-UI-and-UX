import { useEffect } from "react";
import { joinRoom, getRoom } from "../services/api";
import { normalizeAccounts } from "../utils/game";
import { buildFeedFromAccounts, mergeFeed } from "../utils/feed";

const useAutoJoin = ({
  accounts,
  autoJoinLoading,
  gameIds,
  joinRoomUrl,
  getRoomUrl,
  setAccounts,
  setAutoJoinLoading,
  setGameStatus,
  setJoinError,
  setTablePlayers,
  setFeed,
  setupComplete,
  walletAddress,
  walletReady,
}) => {
  useEffect(() => {
    const tryAutoJoin = async () => {
      if (!setupComplete || !walletReady || autoJoinLoading) {
        return;
      }
      if (!gameIds.roomId || accounts.length === 0 || !walletAddress) {
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
        setJoinError(err.message || "Unable to join room.");
      } finally {
        setAutoJoinLoading(false);
      }
    };

    tryAutoJoin();
  }, [
    accounts,
    autoJoinLoading,
    gameIds.roomId,
    joinRoomUrl,
    getRoomUrl,
    setAccounts,
    setAutoJoinLoading,
    setGameStatus,
    setJoinError,
    setTablePlayers,
    setFeed,
    setupComplete,
    walletAddress,
    walletReady,
  ]);
};

export default useAutoJoin;
