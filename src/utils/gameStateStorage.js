const STORAGE_KEY = "mano-poker-state-v1";

const initialFeed = [
  { label: "Dealer", detail: "Shuffle + cut complete" },
  { label: "Table", detail: "Waiting for players to buy in" },
];

const initialPhase = "Pre-flop";

const loadPersistedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export { STORAGE_KEY, initialFeed, initialPhase, loadPersistedState };
