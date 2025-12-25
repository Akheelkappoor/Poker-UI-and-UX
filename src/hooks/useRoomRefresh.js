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
  ]);
};

export default useRoomRefresh;
