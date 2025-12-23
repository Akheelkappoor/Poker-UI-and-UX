import { useCallback } from "react";
import { clamp, normalizeAccounts } from "../utils/game";
import { createRoom } from "../services/api";

const useCreateRoomActions = ({
  createRoomUrl,
  navigate,
  setAccounts,
  setGameIds,
  setMaxPlayerBet,
  setMinPlayerBet,
  setPlayerName,
  setPlayerNameLocked,
  setCurrentAccountId,
  setSetupComplete,
  setSetupError,
  setSetupLoading,
  setSetupMode,
  setTablePlayers,
  setWalletReady,
}) => {
  const applySetupCount = useCallback((value, setSetupForm) => {
    const nextCount = clamp(value, 1, 9);
    setSetupForm((prev) => {
      const names = [...prev.names];
      if (nextCount > names.length) {
        const extras = Array.from(
          { length: nextCount - names.length },
          () => ""
        );
        names.push(...extras);
      } else {
        names.length = nextCount;
      }
      return {
        ...prev,
        numberOfPlayers: nextCount,
        numberOfPlayersInput: String(nextCount),
        names,
      };
    });
  }, []);

  const handleSetupCountChange = useCallback((value, setSetupForm) => {
    if (value === "") {
      setSetupForm((prev) => ({ ...prev, numberOfPlayersInput: "" }));
      return;
    }
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      setSetupForm((prev) => ({
        ...prev,
        numberOfPlayersInput: value,
      }));
    }
  }, []);

  const handleSetupCountBlur = useCallback(
    (setupForm, setSetupForm) => {
      const parsed = Number(setupForm.numberOfPlayersInput);
      applySetupCount(
        Number.isNaN(parsed) ? setupForm.numberOfPlayers : parsed,
        setSetupForm
      );
    },
    [applySetupCount]
  );

  const handleSetupName = useCallback((index, value, setSetupForm) => {
    setSetupForm((prev) => {
      const names = [...prev.names];
      names[index] = value;
      return { ...prev, names };
    });
  }, []);

  const handleCreateRoom = useCallback(
    async (setupForm) => {
      const trimmedNames = setupForm.names.map((name) => name.trim()).filter(Boolean);
      const playerCount = clamp(setupForm.numberOfPlayers, 1, 9);
      if (trimmedNames.length !== playerCount) {
        setSetupError("Please enter a name for every player.");
        return;
      }
      if (setupForm.minAmount <= 0 || setupForm.maxAmount <= 0) {
        setSetupError("Min and max amounts must be greater than zero.");
        return;
      }
      if (setupForm.minAmount > setupForm.maxAmount) {
        setSetupError("Min amount cannot exceed max amount.");
        return;
      }
      setSetupLoading(true);
      setSetupError("");
      try {
        const { response, data } = await createRoom(createRoomUrl, {
          number_of_players: playerCount,
          names: trimmedNames,
          max_amount: setupForm.maxAmount,
          min_amount: setupForm.minAmount,
        });
        if (!response.ok) {
          throw new Error("Failed to create room.");
        }
        const normalized = normalizeAccounts(data);
        if (!data.room_id || normalized.length === 0) {
          throw new Error("Missing room_id or accounts in response.");
        }
        setGameIds({ roomId: data.room_id });
        setAccounts(normalized);
        setTablePlayers(
          normalized.map((account) => ({
            name: account.name,
            status: "Waiting",
          }))
        );
        setMaxPlayerBet(setupForm.maxAmount);
        setMinPlayerBet(setupForm.minAmount);
        setPlayerName(trimmedNames[0] || "");
        setCurrentAccountId(normalized[0]?.id || "");
        setPlayerNameLocked(true);
        setWalletReady(false);
        setSetupComplete(true);
        setSetupMode("");
        navigate("/room", { replace: true });
      } catch (err) {
        setSetupError(err.message || "Unable to create room.");
      } finally {
        setSetupLoading(false);
      }
    },
    [
      createRoomUrl,
      navigate,
      setAccounts,
      setGameIds,
      setMaxPlayerBet,
      setMinPlayerBet,
      setPlayerName,
      setPlayerNameLocked,
      setCurrentAccountId,
      setSetupComplete,
      setSetupError,
      setSetupLoading,
      setSetupMode,
      setTablePlayers,
      setWalletReady,
    ]
  );

  return {
    applySetupCount,
    handleCreateRoom,
    handleSetupCountBlur,
    handleSetupCountChange,
    handleSetupName,
  };
};

export default useCreateRoomActions;
