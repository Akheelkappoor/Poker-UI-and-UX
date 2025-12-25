import { useCallback } from "react";
import { getRoom, joinRoom, rejoinRoom } from "../services/api";
import { normalizeAccounts } from "../utils/game";

const useJoinRoomActions = ({
  alreadyJoinedUrl,
  getRoomUrl,
  joinRoomUrl,
  navigate,
  setAccounts,
  setGameIds,
  setGameStatus,
  setJoinError,
  setJoinLoading,
  setJoinRoomPlayers,
  setJoinSelectedId,
  setPlayerName,
  setPlayerNameLocked,
  setCurrentAccountId,
  setSetupComplete,
  setSetupMode,
  setTablePlayers,
  setWalletAddress,
  setWalletReady,
  setRoomLookupError,
  setRoomLookupLoading,
}) => {
  const handleRoomLookup = useCallback(
    async (roomId) => {
      const trimmed = roomId.trim();
      if (!trimmed) {
        setRoomLookupError("Enter a room id.");
        return;
      }
      setRoomLookupLoading(true);
      setRoomLookupError("");
      try {
        const { response, data } = await getRoom(getRoomUrl, trimmed);
        if (!response.ok) {
          throw new Error("Room not found.");
        }
        if (data?.error) {
          throw new Error(data.error);
        }
        if (data?.status) {
          setGameStatus(data.status);
        }
        const normalized = normalizeAccounts(data);
        if (normalized.length === 0) {
          throw new Error("No players found for this room.");
        }
        setJoinRoomPlayers(normalized);
        setJoinSelectedId("");
      } catch (err) {
        setRoomLookupError(err.message || "Unable to load room.");
      } finally {
        setRoomLookupLoading(false);
      }
    },
    [
      getRoomUrl,
      setGameStatus,
      setJoinRoomPlayers,
      setJoinSelectedId,
      setRoomLookupError,
      setRoomLookupLoading,
    ]
  );

  const handleJoinRoom = useCallback(
    async ({ roomId, selected, joinWalletAddress, joinRoomPlayers }) => {
      const trimmedRoom = roomId.trim();
      if (!trimmedRoom) {
        setJoinError("Room id is required.");
        return;
      }
      if (!selected) {
        setJoinError("Select your name.");
        return;
      }
      if (!selected?.status && !selected?.address && !joinWalletAddress.trim()) {
        setJoinError("Wallet address is required.");
        return;
      }
      setJoinLoading(true);
      setJoinError("");
      try {
        const payload = {
          roomId: trimmedRoom,
          userId: selected?.id,
        };
        let data = {};
        if (selected?.status) {
          const retry = await rejoinRoom(alreadyJoinedUrl, payload);
          data = retry.data;
          if (!retry.response.ok) {
            throw new Error(data?.error || "Unable to rejoin.");
          }
          if (data?.error) {
            throw new Error(data.error);
          }
        } else {
          const response = await joinRoom(joinRoomUrl, {
            ...payload,
            userAddress: joinWalletAddress.trim(),
          });
          data = response.data;
          if (!response.response.ok) {
            throw new Error(data?.error || "Failed to join room.");
          }
          if (data?.error && data?.error !== "Played Already Joined") {
            throw new Error(data.error);
          }
          if (data?.error === "Played Already Joined") {
            const retry = await rejoinRoom(alreadyJoinedUrl, payload);
            data = retry.data;
            if (!retry.response.ok) {
              throw new Error(data?.error || "Unable to rejoin.");
            }
            if (data?.error) {
              throw new Error(data.error);
            }
          }
        }
        let normalized = normalizeAccounts(data);
        if (normalized.length === 0) {
          const refresh = await getRoom(getRoomUrl, trimmedRoom);
          if (refresh.data?.status) {
            setGameStatus(refresh.data.status);
          }
          normalized = normalizeAccounts(refresh.data);
        }
        if (data?.status) {
          setGameStatus(data.status);
        }
        setGameIds({ roomId: trimmedRoom });
        const finalList = normalized.length > 0 ? normalized : joinRoomPlayers;
        setAccounts(finalList);
        setTablePlayers(
          finalList.map((account) => ({
            name: account.name,
            status: account.status || "Waiting",
          }))
        );
        setPlayerName(selected.name);
        setCurrentAccountId(selected.id);
        setPlayerNameLocked(true);
        setWalletAddress(selected.userAddress || joinWalletAddress.trim());
        setWalletReady(true);
        setSetupComplete(true);
        setSetupMode("");
        navigate("/table", { replace: true });
      } catch (err) {
        const message = err.message || "Unable to join room.";
        setJoinError(message);
        if (message === "Wrong user address") {
          setGameIds({ roomId: trimmedRoom });
          setSetupComplete(true);
          setWalletReady(false);
          setCurrentAccountId(selected?.id || "");
          setPlayerNameLocked(false);
          setWalletAddress(joinWalletAddress.trim());
          setSetupMode("");
          navigate("/room", { replace: true });
        }
      } finally {
        setJoinLoading(false);
      }
    },
    [
      alreadyJoinedUrl,
      getRoomUrl,
      joinRoomUrl,
      navigate,
      setAccounts,
      setGameIds,
      setGameStatus,
      setJoinError,
      setJoinLoading,
      setPlayerName,
      setPlayerNameLocked,
      setCurrentAccountId,
      setSetupComplete,
      setSetupMode,
      setTablePlayers,
      setWalletAddress,
      setWalletReady,
    ]
  );

  return {
    handleJoinRoom,
    handleRoomLookup,
  };
};

export default useJoinRoomActions;
