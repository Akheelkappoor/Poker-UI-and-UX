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
  const [autoJoinAttempted, setAutoJoinAttempted] = useState(false);
  const [startGameOpen, setStartGameOpen] = useState(false);
  const [startGameLoading, setStartGameLoading] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [foldLoading, setFoldLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [roundModal, setRoundModal] = useState({ open: false, label: "" });
  const [showdownModal, setShowdownModal] = useState({
    open: false,
    step: "prompt",
  });
  const [showdownLoading, setShowdownLoading] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState("");
  const [joinRoomPlayers, setJoinRoomPlayers] = useState([]);
  const [joinSelectedId, setJoinSelectedId] = useState("");
  const [joinWalletAddress, setJoinWalletAddress] = useState("");
  const [actionModal, setActionModal] = useState({ open: false, callAmount: 0 });
  const [raiseInput, setRaiseInput] = useState(0);

  const urls = useMemo(
    () => ({
      createRoomUrl: import.meta.env.VITE_CREATE_ROOM_URL,
      getRoomUrl: import.meta.env.VITE_GET_ROOM_URL,
      joinRoomUrl: import.meta.env.VITE_JOIN_ROOM_URL,
      alreadyJoinedUrl: import.meta.env.VITE_ALREADY_JOINED_URL,
      startGameUrl: import.meta.env.VITE_START_GAME_URL,
      leaveRoomUrl: import.meta.env.VITE_LEAVE_ROOM_URL,
      raiseUrl: import.meta.env.VITE_RAISE_URL,
      moveUrl: import.meta.env.VITE_MOVE_URL,
      roundUrl: import.meta.env.VITE_ROUND_URL,
      failedUrl: import.meta.env.VITE_FAILED_URL,
      socketUrl: import.meta.env.VITE_WS_URL,
    }),
    []
  );

  return {
    actionModal,
    autoJoinLoading,
    autoJoinAttempted,
    joinError,
    joinLoading,
    joinRoomId,
    joinRoomPlayers,
    joinSelectedId,
    joinWalletAddress,
    leaveLoading,
    foldLoading,
    nextLoading,
    roundModal,
    showdownModal,
    showdownLoading,
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
    setAutoJoinAttempted,
    setJoinError,
    setJoinLoading,
    setJoinRoomId,
    setJoinRoomPlayers,
    setJoinSelectedId,
    setJoinWalletAddress,
    setLeaveLoading,
    setFoldLoading,
    setNextLoading,
    setRoundModal,
    setShowdownModal,
    setShowdownLoading,
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
