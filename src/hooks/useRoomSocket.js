import { useEffect } from "react";
import syncRoom from "../utils/roomSync";

const useRoomSocket = ({
  roomId,
  socketBaseUrl,
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
  useEffect(() => {
    if (!roomId) {
      return;
    }
    const base = socketBaseUrl;
    if (!base) {
      return;
    }
    const socket = new WebSocket(`${base}/?roomId=${roomId}`);
    socket.onmessage = async () => {
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

    return () => {
      socket.close();
    };
  }, [
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
    socketBaseUrl,
  ]);
};

export default useRoomSocket;
