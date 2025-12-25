const roundMap = {
  PREFLOP: "Pre-flop",
  FLOP: "Flop",
  TURN: "Turn",
  RIVER: "River",
  SHOWDOWN: "Showdown",
};

const roundOrder = ["PREFLOP", "FLOP", "TURN", "RIVER", "SHOWDOWN"];

const toRoundKey = (value) => {
  if (!value) {
    return "PREFLOP";
  }
  const key = String(value)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
  return key;
};

export const normalizeRound = (value) => {
  const key = toRoundKey(value);
  return roundMap[key] || value || "Pre-flop";
};

export const getNextRoundKey = (value) => {
  const key = toRoundKey(value);
  const index = roundOrder.indexOf(key);
  if (index < 0 || index >= roundOrder.length - 1) {
    return key;
  }
  return roundOrder[index + 1];
};

export const getNextRoundLabel = (value) =>
  normalizeRound(getNextRoundKey(value));
