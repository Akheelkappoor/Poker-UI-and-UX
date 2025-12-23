import { useEffect, useMemo } from "react";
import {
  findAccount,
  findAccountById,
  getContribution,
  getCurrentBet,
} from "../utils/game";

const phases = ["Pre-flop", "Flop", "Turn", "River", "Showdown"];

const usePhaseControl = ({
  accounts,
  currentAccountId,
  displayName,
  phase,
  readyPlayers,
  setPhase,
  setReadyPlayers,
  updateFeed,
  walletAddress,
}) => {
  const currentAccount = useMemo(
    () =>
      (currentAccountId
        ? findAccountById(accounts, currentAccountId)
        : null) || findAccount(accounts, walletAddress, displayName),
    [accounts, walletAddress, displayName, currentAccountId]
  );

  const ids = useMemo(
    () => accounts.map((player) => player.id).filter(Boolean),
    [accounts]
  );

  const contributions = useMemo(
    () => accounts.map((player) => getContribution(player)),
    [accounts]
  );

  const allEqual = contributions.length > 0 && contributions.every((value) => value === contributions[0]);
  const currentBet = getCurrentBet(accounts);

  const readyCount = ids.filter((id) => readyPlayers[id]).length;
  const notReadyNames = accounts
    .filter((player) => !readyPlayers[player.id])
    .map((player) => player.name);
  const allReady = ids.length > 0 && readyCount === ids.length;
  const canAdvance = allEqual && allReady;

  const isReady = currentAccount?.id ? Boolean(readyPlayers[currentAccount.id]) : false;

  const nextPhase = useMemo(() => {
    const index = phases.indexOf(phase);
    return index >= 0 && index < phases.length - 1 ? phases[index + 1] : phase;
  }, [phase]);

  const handleReady = () => {
    if (!currentAccount?.id) {
      updateFeed("Table", "Unable to ready without a player id.");
      return;
    }
    setReadyPlayers((prev) => ({ ...prev, [currentAccount.id]: true }));
    updateFeed(displayName, `Ready for ${nextPhase}`);
  };

  useEffect(() => {
    if (!canAdvance) {
      return;
    }
    if (nextPhase === phase) {
      return;
    }
    setPhase(nextPhase);
    setReadyPlayers({});
    updateFeed("Table", `Advanced to ${nextPhase}`);
  }, [canAdvance, nextPhase, phase, setPhase, setReadyPlayers, updateFeed]);

  return {
    allEqual,
    allReady,
    canAdvance,
    currentBet,
    handleReady,
    isReady,
    nextPhase,
    notReadyNames,
    readyCount,
  };
};

export default usePhaseControl;
