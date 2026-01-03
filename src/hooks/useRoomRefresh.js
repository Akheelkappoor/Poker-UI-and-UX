import { useEffect } from "react";
import syncRoom from "../utils/roomSync";

const useRoomRefresh = ({
  roomId,
  setAccounts,
  setTablePlayers,
  setGameStatus,
  setFeed,
  setWalletReady,
  currentAccountId,
  setPot,
  setPhase,
  getRoomUrl,
  setMinPlayerBet,
  setMaxPlayerBet,
  setMaxPot,
}) => {
  useEffect(() => {
    const refreshRoom = async () => {
      await syncRoom({
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
      });
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
    setPhase,
    getRoomUrl,
    setMinPlayerBet,
    setMaxPlayerBet,
    setMaxPot,
  ]);
};

export default useRoomRefresh;
