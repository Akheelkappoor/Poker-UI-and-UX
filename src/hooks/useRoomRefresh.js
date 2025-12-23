import { useEffect } from "react";
import { getRoom } from "../services/api";
import { calcPot, normalizeAccounts } from "../utils/game";
import { buildFeedFromAccounts, mergeFeed } from "../utils/feed";

const useRoomRefresh = ({
  roomId,
  setAccounts,
  setTablePlayers,
  setGameStatus,
  setFeed,
  setWalletReady,
  currentAccountId,
  setPot,
  getRoomUrl,
}) => {
  useEffect(() => {
    const refreshRoom = async () => {
      if (!roomId) {
        return;
      }
      const { response, data } = await getRoom(getRoomUrl, roomId);
      if (!response.ok) {
        return;
      }
      if (data?.status) {
        setGameStatus(data.status);
      }
      const normalized = normalizeAccounts(data);
      if (normalized.length > 0) {
        setAccounts(normalized);
        setTablePlayers(
          normalized.map((player) => ({
            name: player.name,
            status: player.status || "Waiting",
          }))
        );
        if (setPot) {
          setPot(calcPot(normalized));
        }
        if (setWalletReady && currentAccountId) {
          const current = normalized.find(
            (player) => String(player.id) === String(currentAccountId)
          );
          const address = current?.userAddress || "";
          const isPlaceholder = /^0x0+$/i.test(address);
          if (address && !isPlaceholder) {
            setWalletReady(true);
          }
        }
        if (setFeed) {
          const remoteFeed = buildFeedFromAccounts(normalized);
          setFeed((prev) => mergeFeed(prev, remoteFeed));
        }
      }
    };

    refreshRoom();
  }, [
    roomId,
    setAccounts,
    setTablePlayers,
    setGameStatus,
    setFeed,
    setWalletReady,
    currentAccountId,
    setPot,
    getRoomUrl,
  ]);
};

export default useRoomRefresh;
