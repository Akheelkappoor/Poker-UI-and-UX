import { useMemo } from "react";
import {
  findAccount,
  findAccountById,
  getContribution,
  getCurrentBet,
} from "../utils/game";
import { getNextRoundLabel } from "../utils/round";

const usePhaseControl = ({
  accounts,
  currentAccountId,
  displayName,
  phase,
  walletAddress,
}) => {
  const currentAccount = useMemo(
    () =>
      (currentAccountId
        ? findAccountById(accounts, currentAccountId)
        : null) || findAccount(accounts, walletAddress, displayName),
    [accounts, walletAddress, displayName, currentAccountId]
  );

  const contributions = useMemo(
    () => accounts.map((player) => getContribution(player)),
    [accounts]
  );

  const allEqual =
    contributions.length > 0 &&
    contributions.every((value) => value === contributions[0]);
  const currentBet = getCurrentBet(accounts);

  const notReadyNames = accounts
    .filter((player) => player.openToBet)
    .map((player) => player.name);
  const readyCount = accounts.length - notReadyNames.length;

  const isReady = currentAccount ? !currentAccount.openToBet : false;

  const nextPhase = useMemo(() => getNextRoundLabel(phase), [phase]);

  return {
    allEqual,
    currentBet,
    isReady,
    nextPhase,
    notReadyNames,
    readyCount,
  };
};

export default usePhaseControl;
