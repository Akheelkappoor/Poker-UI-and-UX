import { useMemo, useState } from "react";

const useGameUiState = () => {
  const [setupMode, setSetupMode] = useState("");
  const [setupForm, setSetupForm] = useState({
    numberOfPlayers: 4,
    numberOfPlayersInput: "4",
    names: ["", "", "", ""],
    maxAmount: 200,
    minAmount: 5,
  });
  const [setupLoading, setSetupLoading] = useState(false);
  const [setupError, setSetupError] = useState("");
  const [roomLookupLoading, setRoomLookupLoading] = useState(false);
  const [roomLookupError, setRoomLookupError] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [autoJoinLoading, setAutoJoinLoading] = useState(false);
  const [startGameOpen, setStartGameOpen] = useState(false);
  const [startGameLoading, setStartGameLoading] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [foldLoading, setFoldLoading] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState("");
  const [joinRoomPlayers, setJoinRoomPlayers] = useState([]);
  const [joinSelectedId, setJoinSelectedId] = useState("");
  const [joinWalletAddress, setJoinWalletAddress] = useState("");
  const [actionModal, setActionModal] = useState({ open: false, callAmount: 0 });
  const [raiseInput, setRaiseInput] = useState(0);

  const urls = useMemo(
    () => ({
      createRoomUrl:
        import.meta.env.VITE_CREATE_ROOM_URL ||
        "https://manoscan-api.vercel.app/pocker-api/create-room",
      getRoomUrl:
        import.meta.env.VITE_GET_ROOM_URL ||
        "https://mano-pocker-api.vercel.app/api/room",
      joinRoomUrl:
        import.meta.env.VITE_JOIN_ROOM_URL ||
        "https://mano-pocker-api.vercel.app/api/join",
      alreadyJoinedUrl:
        import.meta.env.VITE_ALREADY_JOINED_URL ||
        "https://mano-pocker-api.vercel.app/api/join/joined",
      startGameUrl:
        import.meta.env.VITE_START_GAME_URL ||
        "http://192.168.1.16:4541/api/room/start",
      leaveRoomUrl:
        import.meta.env.VITE_LEAVE_ROOM_URL ||
        "http://192.168.1.16:4541/api/player/drop",
      raiseUrl:
        import.meta.env.VITE_RAISE_URL ||
        "http://192.168.1.16:4541/api/player/raise",
    }),
    []
  );

  return {
    actionModal,
    autoJoinLoading,
    joinError,
    joinLoading,
    joinRoomId,
    joinRoomPlayers,
    joinSelectedId,
    joinWalletAddress,
    leaveLoading,
    foldLoading,
    raiseInput,
    roomLookupError,
    roomLookupLoading,
    setupError,
    setupForm,
    setupLoading,
    setupMode,
    startGameLoading,
    startGameOpen,
    urls,
    setActionModal,
    setAutoJoinLoading,
    setJoinError,
    setJoinLoading,
    setJoinRoomId,
    setJoinRoomPlayers,
    setJoinSelectedId,
    setJoinWalletAddress,
    setLeaveLoading,
    setFoldLoading,
    setRaiseInput,
    setRoomLookupError,
    setRoomLookupLoading,
    setSetupError,
    setSetupForm,
    setSetupLoading,
    setSetupMode,
    setStartGameLoading,
    setStartGameOpen,
  };
};

export default useGameUiState;
