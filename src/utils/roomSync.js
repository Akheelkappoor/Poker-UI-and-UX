import { getRoom } from "../services/api";
import { calcPot, getRoomLimits, getRoomPotLimit, normalizeAccounts } from "./game";
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
  setMinPlayerBet,
  setMaxPlayerBet,
  setMaxPot,
}) => {
  if (!roomId) {
    return;
  }
  const { response, data } = await getRoom(getRoomUrl, roomId);
  if (!response.ok) {
    return;
  }
  const normalizedPhase = data?.round ? normalizeRound(data.round) : null;
  if (data?.status) {
    setGameStatus(data.status);
  }
  if (normalizedPhase && setPhase) {
    setPhase(normalizedPhase);
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
  if (setMinPlayerBet || setMaxPlayerBet) {
    const limits = getRoomLimits(data);
    if (limits) {
      if (setMinPlayerBet) {
        setMinPlayerBet(limits.min);
      }
      if (setMaxPlayerBet) {
        setMaxPlayerBet(limits.max);
      }
    }
  }
  if (setMaxPot) {
    const potLimit = getRoomPotLimit(data);
    if (potLimit !== null) {
      setMaxPot(potLimit);
    }
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
  return normalizedPhase;
};

export default syncRoom;
