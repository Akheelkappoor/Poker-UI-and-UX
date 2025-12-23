import { useEffect, useMemo, useState } from "react";
import useFeedState from "./useFeedState";
import useGamePersistence from "./useGamePersistence";
import {
  calcPot,
  calcStackFromBalance,
  derivePlayers,
  findAccount,
  findAccountById,
  getContribution,
  getCurrentBet,
} from "../utils/game";
import { initialPhase, loadPersistedState } from "../utils/gameStateStorage";

export const useGameState = () => {
  const persisted = loadPersistedState() || {};
  const persistedRoomId = persisted.roomId || persisted.gameIds?.roomId || "";
  const persistedUserId = persisted.userId || persisted.currentAccountId || "";
  const [joined, setJoined] = useState(persisted.joined ?? false);
  const [playerName, setPlayerName] = useState(persisted.playerName || "");
  const [buyIn, setBuyIn] = useState(persisted.buyIn ?? 200);
  const [stack, setStack] = useState(persisted.stack ?? 200);
  const [pot, setPot] = useState(persisted.pot ?? 0);
  const [betAmount, setBetAmount] = useState(persisted.betAmount ?? 20);
  const [callAmount, setCallAmount] = useState(persisted.callAmount ?? 10);
  const { feed, setFeed, toasts, updateFeed } = useFeedState(persisted.feed);
  const [phase, setPhase] = useState(persisted.phase || initialPhase);
  const [readyPlayers, setReadyPlayers] = useState(persisted.readyPlayers || {});
  const [currentAccountId, setCurrentAccountId] = useState(persistedUserId);
  const [maxPlayerBet, setMaxPlayerBet] = useState(persisted.maxPlayerBet ?? 200);
  const [maxPot, setMaxPot] = useState(persisted.maxPot ?? 1000);
  const [walletBalance, setWalletBalance] = useState(persisted.walletBalance ?? 500);
  const [gameStatus, setGameStatus] = useState(persisted.gameStatus || "");
  const [setupComplete, setSetupComplete] = useState(
    persisted.setupComplete ?? Boolean(persistedRoomId)
  );
  const [gameIds, setGameIds] = useState({ roomId: persistedRoomId });
  const [playerNameLocked, setPlayerNameLocked] = useState(persisted.playerNameLocked ?? false);
  const [walletAddress, setWalletAddress] = useState(persisted.walletAddress || "");
  const [walletReady, setWalletReady] = useState(persisted.walletReady ?? false);
  const [accounts, setAccounts] = useState(persisted.accounts || []);
  const [minPlayerBet, setMinPlayerBet] = useState(persisted.minPlayerBet ?? 5);
  const [tablePlayers, setTablePlayers] = useState(
    Array.isArray(persisted.tablePlayers)
      ? persisted.tablePlayers
      : [{ name: "Kira", status: "In hand" }, { name: "Arman", status: "In hand" }, { name: "Noah", status: "Waiting" }, { name: "Jules", status: "In hand" }]
  );
  const [betTracker, setBetTracker] = useState(persisted.betTracker || {});

  const displayName = playerName.trim() || "Player";
  const players = useMemo(() => derivePlayers(tablePlayers, displayName, joined), [tablePlayers, displayName, joined]);
  const maxBet = Math.max(10, stack);

  useEffect(() => {
    const account =
      (currentAccountId
        ? findAccountById(accounts, currentAccountId)
        : null) || findAccount(accounts, walletAddress, displayName);
    const { walletBalance: balance, stack: available } =
      calcStackFromBalance(account);
    if (balance !== walletBalance) {
      setWalletBalance(balance);
    }
    if (available !== stack) {
      setStack(available);
    }
    const totalPot = calcPot(accounts);
    if (totalPot !== pot) {
      setPot(totalPot);
    }
    const currentBet = getCurrentBet(accounts);
    const userContribution = getContribution(account);
    const nextCallAmount = Math.max(0, currentBet - userContribution);
    if (nextCallAmount !== callAmount) {
      setCallAmount(nextCallAmount);
    }
  }, [
    accounts,
    walletAddress,
    displayName,
    walletBalance,
    stack,
    pot,
    callAmount,
    setCallAmount,
  ]);

  useEffect(() => {
    if (!currentAccountId || accounts.length === 0) {
      return;
    }
    const account = findAccountById(accounts, currentAccountId);
    if (!account) {
      return;
    }
    if (playerName !== account.name) {
      setPlayerName(account.name || "");
    }
    const accountAddress = account.userAddress || "";
    const isPlaceholder = /^0x0+$/i.test(accountAddress);
    if (!walletAddress && accountAddress && !isPlaceholder) {
      setWalletAddress(accountAddress);
    }
    if (!joined) {
      setJoined(true);
    }
  }, [
    accounts,
    currentAccountId,
    joined,
    playerName,
    setJoined,
    setPlayerName,
    setWalletAddress,
    setWalletReady,
    walletAddress,
    walletReady,
  ]);

  useGamePersistence(
    { roomId: gameIds.roomId, userId: currentAccountId },
    [gameIds.roomId, currentAccountId]
  );

  return {
    accounts,
    betAmount,
    betTracker,
    buyIn,
    callAmount,
    displayName,
    feed,
    phase,
    readyPlayers,
    currentAccountId,
    gameIds,
    gameStatus,
    joined,
    maxBet,
    maxPlayerBet,
    maxPot,
    minPlayerBet,
    playerName,
    playerNameLocked,
    players,
    pot,
    setupComplete,
    stack,
    tablePlayers,
    toasts,
    walletAddress,
    walletBalance,
    walletReady,
    setAccounts,
    setBetAmount,
    setBetTracker,
    setBuyIn,
    setCallAmount,
    setFeed,
    setPhase,
    setReadyPlayers,
    setCurrentAccountId,
    setGameIds,
    setGameStatus,
    setJoined,
    setMaxPlayerBet,
    setMaxPot,
    setMinPlayerBet,
    setPlayerName,
    setPlayerNameLocked,
    setPot,
    setSetupComplete,
    setStack,
    setTablePlayers,
    setWalletAddress,
    setWalletBalance,
    setWalletReady,
    updateFeed,
  };
};
