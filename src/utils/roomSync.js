import { getRoom } from "../services/api";
import { calcPot, normalizeAccounts } from "./game";
import { normalizeRound } from "./round";
import { buildFeedFromAccounts, mergeFeed } from "./feed";

const syncRoom = async ({
  roomId,
  getRoomUrl,
  setGameStatus,
  setPhase,
  setAccounts,
  setTablePlayers,
  setPot,
  setWalletReady,
  currentAccountId,
  setFeed,
}) => {
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
  if (data?.round && setPhase) {
    setPhase(normalizeRound(data.round));
  }
  const normalized = normalizeAccounts(data);
  if (normalized.length === 0) {
    return;
  }
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
};

export default syncRoom;
