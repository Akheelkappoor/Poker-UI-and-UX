export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const normalizeAccounts = (data) => {
  const sources = [data, data?.room, data?.data, data?.room?.data];
  let list = [];
  for (const source of sources) {
    if (!source) {
      continue;
    }
    list =
      source.acccounts ||
      source.accounts ||
      source.players ||
      source.users ||
      [];
    if (Array.isArray(list)) {
      break;
    }
  }
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map((item, index) => {
    if (typeof item === "string") {
      return { id: index, name: item, address: "" };
    }
    return {
      id: String(item._id ?? item.id ?? index),
      name: item.name || `Player ${index + 1}`,
      address: item.address || "",
      status: item.status ?? "",
      poolAddress: item.poolAddress || "",
      userAddress: item.userAddress || "",
      amount: item.walletBalance ?? item.amount ?? "",
      userBalance: item.userBalance ?? "",
      raised: item.raised ?? 0,
      openToBet: Boolean(item.openToBet),
      raises: Array.isArray(item.raises) ? item.raises : [],
    };
  });
};

export const derivePlayers = (tablePlayers, displayName, joined) => {
  const normalized = tablePlayers.map((player) => ({
    ...player,
    status: player.name === displayName && joined ? "You" : player.status,
  }));
  return normalized;
};

export const findAccount = (accounts, walletAddress, displayName) =>
  accounts.find(
    (account) =>
      (walletAddress && account.userAddress === walletAddress) ||
      account.name === displayName
  ) || null;

export const findAccountById = (accounts, accountId) =>
  accounts.find((account) => String(account.id) === String(accountId)) || null;

export const getContribution = (account) => {
  if (!account) {
    return 0;
  }
  const raised = Number(account.raised ?? 0) || 0;
  const raisesTotal = Array.isArray(account.raises)
    ? account.raises.reduce((acc, value) => {
        if (value && typeof value === "object") {
          return acc + (Number(value.amount) || 0);
        }
        return acc + (Number(value) || 0);
      }, 0)
    : 0;
  return Math.max(raised, raisesTotal);
};

export const getCurrentBet = (accounts) =>
  accounts.reduce((maxBet, player) => Math.max(maxBet, getContribution(player)), 0);

export const calcPot = (accounts) =>
  accounts.reduce((sum, player) => sum + getContribution(player), 0);

export const calcStackFromBalance = (account) => {
  if (!account) {
    return { walletBalance: 0, stack: 0 };
  }
  const balance = Number(account.amount) || 0;
  const used = getContribution(account);
  return {
    walletBalance: balance,
    stack: Math.max(0, balance - used),
  };
};

export const getRoomLimits = (data) => {
  const sources = [data, data?.room, data?.data, data?.room?.data];
  const fields = [
    { min: "min_amount", max: "max_amount" },
    { min: "minAmount", max: "maxAmount" },
    { min: "min_bet", max: "max_bet" },
    { min: "minBet", max: "maxBet" },
    { min: "min_player_bet", max: "max_player_bet" },
    { min: "minPlayerBet", max: "maxPlayerBet" },
    { min: "min", max: "max" },
  ];
  for (const source of sources) {
    if (!source || typeof source !== "object") {
      continue;
    }
    for (const { min, max } of fields) {
      const minValue = Number(source[min]);
      const maxValue = Number(source[max]);
      if (!Number.isNaN(minValue) && !Number.isNaN(maxValue)) {
        return { min: minValue, max: maxValue };
      }
    }
  }
  return null;
};

export const getRoomPotLimit = (data) => {
  const sources = [data, data?.room, data?.data, data?.room?.data];
  const fields = [
    "max_pot",
    "maxPot",
    "max_pot_size",
    "maxPotSize",
    "max_pot_amount",
    "maxPotAmount",
  ];
  for (const source of sources) {
    if (!source || typeof source !== "object") {
      continue;
    }
    for (const field of fields) {
      const value = Number(source[field]);
      if (!Number.isNaN(value)) {
        return value;
      }
    }
  }
  return null;
};
