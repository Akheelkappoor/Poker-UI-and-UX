import { useEffect, useRef } from "react";
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
}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!roomId) {
      return;
    }
    const base = socketBaseUrl;
    if (!base) {
      return;
    }
    const socket = new WebSocket(`${base}/?roomId=${roomId}`);
    socketRef.current = socket;

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
      });
    };

    return () => {
      socket.close();
      socketRef.current = null;
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
    socketBaseUrl,
  ]);
};

export default useRoomSocket;
