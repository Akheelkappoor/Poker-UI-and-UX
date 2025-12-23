const actionLabels = {
  BET: "Bet",
  CALL: "Called",
  RAISE: "Raised",
  FOLD: "Folded",
};

export const buildFeedFromAccounts = (accounts) => {
  const items = [];
  accounts.forEach((player) => {
    if (!Array.isArray(player.raises)) {
      return;
    }
    player.raises.forEach((entry) => {
      if (!entry) {
        return;
      }
      if (typeof entry === "object") {
        const label = actionLabels[entry.action] || entry.action || "Action";
        const amount = Number(entry.amount) || 0;
        const detail = amount > 0 ? `${label} ${amount}` : label;
        items.push({ label: player.name, detail });
      } else {
        items.push({ label: player.name, detail: `Bet ${entry}` });
      }
    });
  });
  return items.slice(-5).reverse();
};

export const mergeFeed = (localFeed, remoteFeed) => {
  const combined = [...(localFeed || []), ...(remoteFeed || [])];
  const seen = new Set();
  const unique = [];
  combined.forEach((item) => {
    const key = `${item.label}-${item.detail}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    unique.push(item);
  });
  return unique.slice(0, 5);
};
